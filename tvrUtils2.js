const fs = require('fs');
const path = require('path');
const JSON5 = require('json5');
const _ = require('lodash');

// берем текущую папку
var extFile = '.md'; //расширение файлов markdown
const myDir = process.cwd();

console.log('--- рабочая папка: ' + myDir);

const dirDataPath = myDir + '\\src\\pages\\articles\\';

console.log('--- контент папка: ' + dirDataPath);

const dirData = fs.readdirSync(dirDataPath); // корневая папка с данными
const fileList = [];

// тестовый md-файл
//var testFilename = "test_meta";
//var test_meta = "test_meta.md"; // тестовый файл 2
//var testFile = myDir + "\\" + testFilename + ".md";
var testFile = 'test_meta.md';

// массив md-файлов папки dirData (в основном файлы описаний разделов)
// применяем метод для массивов - filter получаем на выходе массив md-имен файлов
var mdFilesList = dirData.filter(function(filename) {
	return filename.lastIndexOf(extFile) != -1;
});

mdFilesList.forEach(element => {
	let st = element;
	st = element.substr(0, st.length - 3); // избавляемся от расширения .md
	fileList.push(_.startCase(st)); // помещаем очищенные от "_" строки в fileList
});

// шаблон метаданных
const templateKey = 'article-post';
const myDate = new Date();

var myMetaTemplate = {
	templateKey: templateKey, // название шаблона вида
	title: 'заголовок',
	date: myDate, //дата
	description: 'описание'
	//tags: {} // теги разделены тире
};

// console.log(myDir);
// console.log('Имя тестового файла: ' + testFile);

// заполнение для всех файлов в рабочей папке
function execMeta() {
	fileList.forEach(element => {
		myMetaTemplate.title = element; // записываем в title мета-данных - название файла
		// производим имя файла
		const filename =
			dirDataPath + '\\' + mdFilesList[fileList.indexOf(element)];
		addMeta(filename);
	});
}

// Добавляем метаданные с перезаписью
function addMeta(filename) {
	if (filename == '') {
		filename = testFile;
	}

	removeMeta(filename);

	var fileContent = fs.readFileSync(filename, 'utf8');

	// fileContent = fileContent.split('\n');
	// fileContent.pop();
	// fs.appendFileSync((testFile), "- - - -  - - - - - -");
	fs.writeFileSync(filename, '---\r'); // перезаписываем файл разделителем
	for (var item in myMetaTemplate) {
		fs.appendFileSync(filename, item + ' : ' + myMetaTemplate[item]); // добавляем новый текст
		fs.appendFileSync(filename, '\r'); // добавляем пустую строку
	}

	fs.appendFileSync(filename, '\n---\n'); // добавляем разделитель мета-данных от текста
	fs.appendFileSync(filename, '\n'); // добавляем пустую строку
	fs.appendFileSync(filename, fileContent); // добавляем старый текст

	console.log('матаданные были добавлены в файл: ' + filename);
} // addMeta() end

// удаляем метаданные если они есть
function removeMeta(filename) {
	if (filename == '') {
		filename = testFile;
	}
	if (metaGet(filename)) {
		fs.writeFileSync(filename, metaGet().trim());
	} else {
		console.log('метаданных в файле итак нет');
	}
} // end of removeMeta()

// Извлечение метаданных
function metaGet(filename) {
	if (filename == '') {
		filename = testFile;
	}
	var fileContent = fs.readFileSync(filename, 'utf8');
	fileContent.trim();
	if (fileContent.startsWith('---')) {
		let cutStart = fileContent.indexOf('---');
		cutStart = cutStart + 3;
		console.log('номер первого символа: ' + cutStart);
		let cutEnd = fileContent.indexOf('---', 5);
		cutEnd = cutEnd - 1;
		console.log('номер последнего символа: ' + cutEnd);
		let metaContent = fileContent.substring(cutStart, cutEnd);
		metaContent = metaContent.trim();
		metaContent = metaContent.toString();
		return metaContent;
	} else {
		return false;
	}
}
// функция заполнения объекта метаданных считанным из файла содержимым ! НЕНУЖНА ? !
function metaFill() {
	// передаем считанные данные в виде строки
	var my_meta = metaGet(filename);
	my_meta = my_meta.split('\r');
	//console.log("my_meta до применения split(): "+my_meta);

	for (const key in my_meta) {
		if (my_meta.hasOwnProperty(key)) {
			myMetaTemplate[key] = my_meta[key];
		}
	}
	return myMetaTemplate;
}

// представляет мета - данные в JSON
function metaJSON() {
	// deprecated
	var my_meta = metaGet();
	// console.log(my_meta);

	if (my_meta) {
		//my_meta = "{" + my_meta + "}";
		my_meta = JSON5.stringify(my_meta);
		my_meta = JSON5.parse(my_meta);
		return my_meta;
	}
	console.log(
		'функция metaJSON() сообщает, что метаданные в файле не обнаружены'
	);

	return false;
}

// ТЕСТЫ

function getBeginString(int) {
	var fileContent = fs.readFileSync(testFile, 'utf8');
	var strStart = fileContent[int];
	return strStart;
}

// обработка аргументов командной строки
function tvrConsole() {
	if (process.argv[2] == '') {
		console.log('аргументов передано не было, выполняем основной функционал');
		execMeta();
	} else {
		if (process.argv[2] == 'run') {
			// если передана команда run, - выполнить основную функцию
			execMeta();
		}

		if (process.argv[2] == 'meta') {
			console.log('получена команда: ' + process.argv[2]);

			if (process.argv[3] == 'add') {
				console.log('получена команда: ' + process.argv[3]);
				console.log('добавляем метаданные в тестовый файл');
				addMeta();
			}
			if (process.argv[3] == 'remove') {
				console.log('получена команда: ' + process.argv[3]);
				console.log('удаляем метаданные из тестового файла, если они есть');
				removeMeta();
			}
			if (process.argv[3] == 'fill') {
				console.log('получена команда: ' + process.argv[3]);
				console.log(
					'выводим содержимое объекта myMetaTemplate заполненного прочтенными данными '
				);
				var s = metaFill();
				console.log(s[0]);
				console.log(s.title);
			}
		} else {
			// обработка аргументов test
			if (process.argv[2] == 'test') {
				console.log('получена команда: ' + process.argv[2]);

				var re = /\d/;
				var n = parseInt(process.argv[3]);
				var str = process.argv[3];

				if (re.test(str)) {
					console.log('получена команда: ' + str);

					console.log(
						'этот тест выводит символы из тестового файла по номеру в аргументе: '
					);
					var strng = getBeginString(n);
					console.log('выбранный вами символ: ' + strng);
				} else {
					if (str == 'json') {
						var jsonTest = metaJSON();
						console.log('этот тест выводит мета-данные в виде JSON: ');
						console.log('заголовок: ' + jsonTest[1]);

						console.log(jsonTest);
					} else {
						if (str == 'meta') {
							console.log(metaGet());
						} else {
							console.log('второй параметр теста не распознан');
						}
					}

					if (str == 'dir') {
						console.log('список файлов целевой папки ' + dirDataPath + ' :');
						console.log(mdFilesList);
					}

					if (str == 'files') {
						console.log(
							'список файлов в формате Start Case папки ' + dirDataPath + ' :'
						);
						console.log(fileList);
					}
				}
			}
		}
	}
}

tvrConsole();
