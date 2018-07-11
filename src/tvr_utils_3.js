// мои утилиты для организации сайта

const fs = require('fs');
const path = require('path');
const _ = require('lodash');

// основные переменные

var extFile = '.md'; //расширение файлов markdown

var myDir = process.cwd(); // главная папка контента
const subDir = 'articles';
const dirDataPath = myDir + '\\pages' + '\\' + subDir + '\\';
const dirData = fs.readdirSync(dirDataPath); // корневая папка с данными
const indexPath = dirDataPath + 'index.md'; // путь к файлу index.md текущей папки

function getIndexFileData() {
	if (fs.readFileSync(indexPath)) {
		const indFile = fs.readFileSync(indexPath);
		return indFile;
	}
}

//console.log(dirData);
const filesNames = [];
const filesTitles = [];
const filesLinks = [];

// массив md-файлов папки dirData
// применяем метод filter для массивов, получаем на выходе массив md-имен файлов
var mdFiles = dirData.filter(function(filename) {
	return filename.lastIndexOf(extFile) != -1;
});

mdFiles.forEach(element => {
	let st = element;
	st = element.substr(0, st.length - 3); // избавляемся от расширения .md
	filesNames.push(st); // массив имен файлов без расширения
	filesTitles.push(_.startCase(st)); // помещаем очищенные от "_" строки в filesTitles
});

// функция создания списка ссылок на файлы статей
function articlesList() {
	for (let index = 0; index < filesNames.length; index++) {
		const element =
			'\n'+'[' + filesTitles[index] + ']' + '(' + '/'+ subDir + '/' + filesNames[index] + '.md'+')' + '\n';
		filesLinks.push(element);
	}
	const arr = filesLinks;
	return arr;
}

function addLinks() {
	const myLinksList = articlesList();
	const myIndexFile = indexPath;
	fs.appendFileSync(myIndexFile, _.initial(myLinksList));
}

// обработка аргументов командной строки
function tvrConsole() {
	if (process.argv[2] == '') {
		console.log(
			'аргументов передано не было, или они не верны, ничего не сделано'
		);
	} else {
		if (process.argv[2] == 'links') {
			// если links, - выводим список ссылок
			const arr = articlesList();
			console.log(arr);
		}
		if (process.argv[2] == 'addlinks') {
			addLinks();
		}
	}
}

tvrConsole();
