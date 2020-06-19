"use strict";

//Ставим минимальную высоту для разных шапок
if (window.outerWidth < 600) { 
  $('.header .main-wrapper').css('min-height', $('.header .svg-content').outerWidth() * 0.7219251336898396 + 'px');
} else {
  $('.header .main-wrapper').css('min-height', $('.header .svg-content').outerWidth() * 0.3743 + 'px');
} 
$('.header .title-wrapper').css('min-height', $('.header .svg-content').outerWidth() * 0.091796875 - 10 + 'px');
$('.header .gift-wrapper').css('min-height', $('.header .svg-content').outerWidth() * 0.5766666666666667 + 'px');
$('.top-gift svg').height($('.top-gift svg').width() / 1.982758620689655)
$(window).resize(function () {
  if (window.outerWidth < 600) { 
    $('.header .main-wrapper').css('min-height', $('.header .svg-content').outerWidth() * 0.7219251336898396 + 'px');
  } else {
    $('.header .main-wrapper').css('min-height', $('.header .svg-content').outerWidth() * 0.3743 + 'px');
  } 
  $('.header .title-wrapper').css('min-height', $('.header .svg-content').outerWidth() * 0.091796875 - 10 + 'px');
  $('.header .gift-wrapper').css('min-height', $('.header .svg-content').outerWidth() * 0.5766666666666667 - 10 + 'px')
  $('.top-gift svg').height($('.top-gift svg').width() / 1.982758620689655)
});


$(document).ready(function () { 

  //Функция для кнопки удаления подарков
  if (document.querySelector('.remove__gift')) {
    for (let index = 0; index < document.querySelectorAll('.remove__gift').length; index++) {
      const removeLink = document.querySelectorAll('.remove__gift')[index];
      $(removeLink).click(function () {
        $(this).parents('.main__gift').remove();
      });
    }  
  }


  //Открытия окна подарков для получателя
  if (document.querySelector('.gift-wrapper')) {
    //Контент для взрослых
    let ContentAge18 = true;
    //Для того, чтобы окно не открывалась по два раза
    let CountClickContentAge = 0;
    document.querySelector('.gift-wrapper').onclick = function() {
      if (ContentAge18 && CountClickContentAge == 0) {
        if (document.documentElement.clientWidth >= 500) {
          document.querySelector('.gift-wrapper').append(document.querySelector('.confrim').cloneNode(true));
          document.querySelector('.confrim').classList.remove('confrim');
          document.querySelector('.gift').classList.add('confrim');
          $('#top-svg-1, #top-svg-2').attr('fill', 'url(#paint2_linear)');
          $('.header__logo').eq(0).attr('src', 'img/logo-white.svg');
        } else {
          document.querySelector('.confrim').classList.add('confrim-active')
        }
        $('button.yes').click(function () {
          $('.first').slideUp(500).addClass('slide'); 
          $('.modal').removeClass('modal');
          objectFitPolyfill();
        })
        $('button.no').click(function () {
          //Вставить ссылку на recipient-feedback
          document.location.href = "http://localhost:3000/recipient-feedback.html"
        })
        CountClickContentAge++;
      } else if (CountClickContentAge == 0) {
        $('.first').slideUp(500).addClass('slide'); 
        $('.modal').removeClass('modal');
        objectFitPolyfill();
      }
    }
  }

  //Валидация форм
  //Для поля копирования ссылки
  $('.copy').click(function () {
    event.preventDefault();
  })
  if (document.getElementById('link-1')) {
    document.getElementById('link-1').addEventListener('click', function(e) {
      e.target.select();
    });
  }

  //Элемент, который выводится под полем, если оно invalid
  let erorPhrase = document.createElement('div');
  erorPhrase.classList.add('eror-phrase');
  erorPhrase.classList.add('form');
  erorPhrase.innerHTML = 'Неверный формат';

  //Фразы ошибок 
  const EmailEror = 'Неверный адрес почты',
  PhoneEror = 'Неверный формат телефона',
  NameErorLess = 'Слишком короткое имя',
  NameErorMore = 'Слишком длинное имя',
  NameErorFormat = 'Должно содержать только буквы',
  SecondNameErorLess = 'Слишком короткая фамилия',
  SecondNameErorMore = 'Слишком длинная фамилия',
  SecondNameErorFormat = 'Должна содержать только буквы',
  NicknameErorLess = 'Слишком короткий никнейм',
  NicknameErorMore = 'Слишком длинный никнейм',
  NicknameErorFormat = 'Не должен содержать пробелы',
  UrlEror = 'Неверный формат ссылки',
  Adress1ErorLess = 'Слишком коротко',
  Adress1ErorFormat = 'Только буквы, пробелы и дефисы',
  Adress2ErorLess = 'Слишком короткий адрес',
  Adress2ErorMore = 'Слишком длинный адрес',
  Adress2ErorFormat = 'Неизвестная ошибка',
  IndexEror = 'Неверный индекс',
  BigErorEmpty = 'Вы забыли ссылку',
  BigErorStore = 'Не работаем с этим магазином',
  BigErorServer = 'Не удалось добавить подарок',
  CheckboxErorAll = 'Примите условия использования и выберите хотя бы один подарок', 
  CheckboxErorGift = 'Должен быть хотя бы один подарок',
  CheckboxErorAgree = 'Примите условия использования',
  RadioEror = 'Выберете один вариант ответа';


  //Вешаем события для валидации на кнопку и поля
  let buttons =  document.querySelectorAll('[novalidate=""] [type*=submit]');
  for (let index = 0; index < buttons.length; index++) {
    const button = buttons[index];
    button.onclick = function (event) {
      event.preventDefault();
      let inputs = button.closest('form').querySelectorAll('input:not([type*=submit])');
      for (let index = 0; index < inputs.length; index++) {
        const input = inputs[index];
        
        (input.classList.contains('email')) ? validEmail(input):
        (input.classList.contains('phone')) ? validTel(input):
        (input.classList.contains('name')) ? validName(input):
        (input.classList.contains('secondname')) ? validSecondName(input):
        (input.classList.contains('nickname')) ?  validNickname(input):
        (input.classList.contains('url')) ? validUrl(input):
        (input.classList.contains('big')) ? validBig(input):
        (input.classList.contains('index')) ? validIndex(input):
        (input.classList.contains('adress-1')) ? validAdress1(input):
        (input.classList.contains('adress-2')) ? validAdress2(input):
        false

        //Если обязательные поля пустые 
        if (input.classList.contains('required') && input.value == "") {
          input.classList.remove('valid');
          input.classList.add('eror');
          erorPhrase.innerHTML = 'Поле не должно быть пустым';
          input.after(erorPhrase.cloneNode(true));
        }
        
        //Если поле для подарков пустое
        if (input.classList.contains('big') && input.value == "") {
          input.classList.remove('valid');
          input.classList.add('eror');
          input.value = BigErorEmpty;
        }

        //Мигание ошибки при кликле на кнопку поля для подарков
        if (input.classList.contains('big') && input.classList.contains('eror')) {
          input.classList.remove('eror');
          setTimeout(function() {input.classList.add('eror')}, 10)
        }
      };
    }
  }  
 
  let inputs = document.querySelectorAll('[novalidate=""] input:not([type*=submit])');
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];

    (input.classList.contains('email')) ? input.onblur = function() {validEmail(input)}:
    (input.classList.contains('phone')) ? input.onblur = function() {validTel(input)}:
    (input.classList.contains('name')) ? input.onblur = function() {validName(input)}:
    (input.classList.contains('secondname')) ? input.onblur = function() {validSecondName(input)}:
    (input.classList.contains('nickname')) ? input.onblur = function() {validNickname(input)}:
    (input.classList.contains('url')) ? input.onblur = function() {validUrl(input)}:
    (input.classList.contains('index')) ? input.onblur = function() {validIndex(input)}:
    (input.classList.contains('adress-1')) ? input.onblur = function() {validAdress1(input)}:
    (input.classList.contains('adress-2')) ? input.onblur = function() {validAdress2(input)}:
    false

    //Отдельные события для поля подарков
    if (input.classList.contains('big')) {
      input.onblur = function() {validBig(input)};
      input.onkeypress = function (e) {
        if (e.which == 13) { //Нажатие на Enter убирает фокус с поля
          input.blur()
        }
      };
      input.addEventListener('paste', function(event) {
        event.preventDefault();
        let paste = (event.clipboardData || window.clipboardData).getData('text');
        input.value = paste;
        validBig(input);
      });
    }

    //Для всех полей, кроме подарка, вешаем события фокуса
    if (!input.classList.contains('big')) {
      input.onfocus = function() {
        input.classList.remove('eror');
        input.nextElementSibling != null ? input.nextElementSibling.remove(): false 
      }
    }
  }

  //Сами функции для валидации
  function validEmail(input) {
    //Регулярное выражение
    let inputTest = /^([A-Za-z0-9_-]+\.)*[[A-Za-z0-9_-]+@[[A-Za-z0-9_-]+(\.[[A-Za-z0-9_-]+)*\.[a-z]{2,6}$/.test(input.value);
    //Условие для удаления ошибки, если она есть
    input.nextElementSibling != null ? input.nextElementSibling.remove() : false

    if (input.value == "") {
      input.classList.remove('eror')
    } else if (!inputTest) {
      input.classList.remove('valid');
      input.classList.add('eror');

      erorPhrase.innerHTML = EmailEror;

      input.after(erorPhrase.cloneNode(true));
    } else {
      input.classList.remove('eror');
      input.classList.add('valid');
    }
  }
  
  function validTel(input) {
    let inputTest = /^\+*\d{1,3}\d{10}$/.test(input.value); 
    input.nextElementSibling != null ? input.nextElementSibling.remove() : false

    if (input.value == "") {
      input.classList.remove('eror')
    } else if (!inputTest) {
      input.classList.remove('valid');
      input.classList.add('eror');

      erorPhrase.innerHTML = PhoneEror;

      input.after(erorPhrase.cloneNode(true));
    } else {
      input.classList.remove('eror');
      input.classList.add('valid');
    }
  }
  function validName(input) {
    let inputTest = /^[a-zA-Zа-яА-Я]{3,32}$/.test(input.value); 
    input.nextElementSibling != null ? input.nextElementSibling.remove() : false
    
    if (input.value == "") {
      input.classList.remove('eror')
    } else if (!inputTest) {
      input.classList.remove('valid');
      input.classList.add('eror');

      (input.value.length < 3) ? erorPhrase.innerHTML = NameErorLess:
      (input.value.length > 32) ? erorPhrase.innerHTML = NameErorMore:
      erorPhrase.innerHTML = NameErorFormat;

      input.after(erorPhrase.cloneNode(true));
    } else {
      input.classList.remove('eror');
      input.classList.add('valid');
    }
  }
  function validSecondName(input) {
    let inputTest = /^[a-zA-Zа-яА-Я]{3,32}$/.test(input.value); 
    input.nextElementSibling != null ? input.nextElementSibling.remove() : false

    if (input.value == "") {
      input.classList.remove('eror')
    } else if (!inputTest) {
      input.classList.remove('valid');
      input.classList.add('eror');

      (input.value.length < 3) ? erorPhrase.innerHTML = SecondNameErorLess:
      (input.value.length > 32) ? erorPhrase.innerHTML = SecondNameErorMore:
      erorPhrase.innerHTML = SecondNameErorFormat;

      input.after(erorPhrase.cloneNode(true));
    } else {
      input.classList.remove('eror');
      input.classList.add('valid');
    }
  }
  function validNickname(input) {
    let inputTest = /\S{3,32}$/.test(input.value); 
    input.nextElementSibling != null ? input.nextElementSibling.remove() : false

    if (input.value == "") {
      input.classList.remove('eror')
    } else if (!inputTest) {
      input.classList.remove('valid');
      input.classList.add('eror');

      (input.value.length < 3) ? erorPhrase.innerHTML = NicknameErorLess:
      (input.value.length > 32) ? erorPhrase.innerHTML = NicknameErorMore:
      erorPhrase.innerHTML = NicknameErorFormat;

      input.after(erorPhrase.cloneNode(true));
    } else {
      input.classList.remove('eror');
      input.classList.add('valid');
    }
  }
  function validUrl(input) {
    let inputTest = /^((https?|ftp)\:\/\/)?([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z]{2,6})(\/?)[^]+$/.test(input.value); 
    input.nextElementSibling != null ? input.nextElementSibling.remove() : false

    if (input.value == "") {
      input.classList.remove('eror')
    } else if (!inputTest) {
      input.classList.remove('valid');
      input.classList.add('eror');

      erorPhrase.innerHTML = UrlEror;

      input.after(erorPhrase.cloneNode(true));
    } else {
      input.classList.remove('eror');
      input.classList.add('valid');
    }
  }
  //Для всех полей адреса, кроме "Улица, дом, квартира"
  function validAdress1(input) {
    let inputTest = /^[a-zA-Zа-яА-Я]{2,}(?:[\s-][a-zA-Zа-яА-Я]+)*$/.test(input.value); 
    input.nextElementSibling != null ? input.nextElementSibling.remove() : false

    if (input.value == "") {
      input.classList.remove('eror')
    } else if (!inputTest) {
      input.classList.remove('valid');
      input.classList.add('eror');

      (input.value.length < 2) ? erorPhrase.innerHTML = Adress1ErorLess:
      erorPhrase.innerHTML = Adress1ErorFormat;

      input.after(erorPhrase.cloneNode(true));
    } else {
      input.classList.remove('eror');
      input.classList.add('valid');
    }
  }
  //Для поля "Улица, дом, квартира"
  function validAdress2(input) {
    let inputTest = /^[^]{3,70}$/.test(input.value); 
    input.nextElementSibling != null ? input.nextElementSibling.remove() : false

    if (input.value == "") {
      input.classList.remove('eror')
    } else if (!inputTest) {
      input.classList.remove('valid');
      input.classList.add('eror');

      (input.value.length < 3) ? erorPhrase.innerHTML = Adress2ErorLess:
      (input.value.length > 70) ? erorPhrase.innerHTML = Adress2ErorMore:
      erorPhrase.innerHTML = Adress2ErorFormat;
      
      input.after(erorPhrase.cloneNode(true));
    } else {
      input.classList.remove('eror');
      input.classList.add('valid');
    }
  }
  function validIndex(input) {
    let inputTest = /^\d{5,6}$/.test(input.value); 
    input.nextElementSibling != null ? input.nextElementSibling.remove() : false

    if (input.value == "") {
      input.classList.remove('eror')
    } else if (!inputTest) {
      input.classList.remove('valid');
      input.classList.add('eror');

      erorPhrase.innerHTML = IndexEror;

      input.after(erorPhrase.cloneNode(true));
    } else {
      input.classList.remove('eror');
      input.classList.add('valid');
    }
  }
  // Валидация полей для подарка   
  function validBig(input) { 
    let inputTest = /^(https\:\/\/)*(www.)*ozon.ru\//.test(input.value); 
    let ConditionForEror = false; // Для очитски поля при фокусе
    let UserTry = 0;
    input.onfocus = function(e) {
      ConditionForEror ? e.target.value = "" : false;
      ConditionForEror = false;
      e.target.classList.remove('valid');
      e.target.classList.remove('eror');
      e.target.value == "";
    }
    if (input.value == "") { // Пустое поле
      input.classList.remove('valid');
      input.classList.remove('eror');
      ConditionForEror = true;
    } else if (!inputTest) { // Не магазин ozon
      input.classList.remove('valid');
      input.classList.add('eror');
      input.value = BigErorStore;
      ConditionForEror = true;
    } else { // Поле прошло клиентскую проверку 
      input.classList.remove('eror');
      input.classList.add('valid');
      //linkGift - ссылка на подарок  
      let linkGift = input.value;

      //Добавляем ссылке необходимы слова, если надо (https, www)
      /https:\/\/(?!www\.)/.test(linkGift) ? linkGift = linkGift.replace('https://', 'https://www.') :
      /(?!https:\/\/)www\./.test(linkGift) ? linkGift = linkGift.replace('www.', 'https://www.') :
      /https\:\/\/www\./.test(linkGift) == false ? linkGift = "https://www." + linkGift:
      true;

      //Запрос на сервер
      if (xhr.status == 200) {
        //Вставить ссылку на страницу заказа
        input.closest('.main-for-gift') == null ? document.location.href = "http://localhost:3000/order.html" : false;
      } else {
        // обработать ошибку
        UserTry++
        if (UserTry == 2) {
          //Вставить ссылку на страницу с ошибкой
          document.location.href = "http://localhost:3000/eror-1.html"
        } else {
          input.value = BigErorServer;
          ConditionForEror = true;
        }
      }
    }
  }
  //Валидация checkbox "Согласие с условиями" 
  for (let index = 0; index < document.querySelectorAll('.agree:not(.radio) [type*=submit]').length; index++) {
    const button = document.querySelectorAll('.agree:not(.radio) [type*=submit]')[index];
    
    button.addEventListener('click', function(e)  {
      if (button.classList.contains('empty')) {
        e.preventDefault();
      } else {
        erorPhrase.classList.remove('form');
        erorPhrase.classList.add('order');
        if (document.querySelector('.main__gift') == null && e.target.closest('form').querySelector('*:checked') == null) {
          e.preventDefault();
          erorPhrase.innerHTML = CheckboxErorAll;
          e.target.closest('form').after(erorPhrase);
        }
        else if (document.querySelector('.main__gift') == null) {
          e.preventDefault();
          erorPhrase.innerHTML = CheckboxErorGift;
          e.target.closest('form').after(erorPhrase);
        } else if (e.target.closest('form').querySelector('*:checked') == null ) {
          e.preventDefault();
          erorPhrase.innerHTML = CheckboxErorAgree;
          e.target.closest('form').after(erorPhrase);
        }
        e.target.closest('form').classList.add('clicked');
      }
    }) 
  };
  //Валидация radio 
  for (let index = 0; index < document.querySelectorAll('.agree.radio [type*=submit]').length; index++) {
    const button = document.querySelectorAll('.agree.radio [type*=submit]')[index];
    
    button.addEventListener('click', function(e) {
      erorPhrase.classList.remove('form');
      erorPhrase.classList.add('order');
       if (e.target.closest('form').querySelector('*:checked') == null ) {
        e.preventDefault();
        erorPhrase.innerHTML = RadioEror;
        e.target.closest('form').append(erorPhrase);
      }
    }) 
  };
});

document.querySelector('.admin-panel__button').addEventListener('click', function (e) {
  document.querySelector('.admin-panel__button').classList.toggle('admin_off');
  document.querySelector('.admin-panel').classList.toggle('admin_off');
})

//Полифилы
!function(){"use strict";if("undefined"!=typeof window){var e=window.navigator.userAgent.match(/Edge\/(\d{2})\./),n=!!e&&16<=parseInt(e[1],10);if(!("objectFit"in document.documentElement.style!=!1)||n){var o=function(e){var t=e.parentNode;!function(e){var t=window.getComputedStyle(e,null),i=t.getPropertyValue("position"),n=t.getPropertyValue("overflow"),o=t.getPropertyValue("display");i&&"static"!==i||(e.style.position="relative"),"hidden"!==n&&(e.style.overflow="hidden"),o&&"inline"!==o||(e.style.display="block"),0===e.clientHeight&&(e.style.height="100%"),-1===e.className.indexOf("object-fit-polyfill")&&(e.className=e.className+" object-fit-polyfill")}(t),function(e){var t=window.getComputedStyle(e,null),i={"max-width":"none","max-height":"none","min-width":"0px","min-height":"0px",top:"auto",right:"auto",bottom:"auto",left:"auto","margin-top":"0px","margin-right":"0px","margin-bottom":"0px","margin-left":"0px"};for(var n in i)t.getPropertyValue(n)!==i[n]&&(e.style[n]=i[n])}(e),e.style.position="absolute",e.style.height="100%",e.style.width="auto",e.clientWidth>t.clientWidth?(e.style.top="0",e.style.marginTop="0",e.style.left="50%",e.style.marginLeft=e.clientWidth/-2+"px"):(e.style.width="100%",e.style.height="auto",e.style.left="0",e.style.marginLeft="0",e.style.top="50%",e.style.marginTop=e.clientHeight/-2+"px")},t=function(e){if(void 0===e||e instanceof Event)e=document.querySelectorAll("[data-object-fit]");else if(e&&e.nodeName)e=[e];else{if("object"!=typeof e||!e.length||!e[0].nodeName)return!1;e=e}for(var t=0;t<e.length;t++)if(e[t].nodeName){var i=e[t].nodeName.toLowerCase();if("img"===i){if(n)continue;e[t].complete?o(e[t]):e[t].addEventListener("load",function(){o(this)})}else"video"===i?0<e[t].readyState?o(e[t]):e[t].addEventListener("loadedmetadata",function(){o(this)}):o(e[t])}return!0};"loading"===document.readyState?document.addEventListener("DOMContentLoaded",t):t(),window.addEventListener("resize",t),window.objectFitPolyfill=t}else window.objectFitPolyfill=function(){return!1}}}();

(function() {
  // проверяем поддержку
  if (!Element.prototype.closest) {
    // реализуем
    Element.prototype.closest = function(css) {
      var node = this;
      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }

})();

(function() {
  // проверяем поддержку
  if (!Element.prototype.matches) {
    // определяем свойство
    Element.prototype.matches = Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;
  }
})();

//Функция выделения текста с полифилом
function selectText(containerid) {
  if (document.selection) { // IE
    var range = document.body.createTextRange();
    range.moveToElementText(document.getElementById(containerid));
    range.select();
  } else if (window.getSelection) {
    var range = document.createRange();
    range.selectNode(document.getElementById(containerid));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  }
}
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('append')) {
      return;
    }
    Object.defineProperty(item, 'append', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();
        
        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        
        this.appendChild(docFrag);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('after')) {
      return;
    }
    Object.defineProperty(item, 'after', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function after() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();
        
        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        
        this.parentNode.insertBefore(docFrag, this.nextSibling);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);


function applyFocusVisiblePolyfill(scope){var hadKeyboardEvent=true;var hadFocusVisibleRecently=false;var hadFocusVisibleRecentlyTimeout=null;var inputTypesWhitelist={text:true,search:true,url:true,tel:true,email:true,password:true,number:true,date:true,month:true,week:true,time:true,datetime:true,'datetime-local':true};function isValidFocusTarget(el){if(el&&el!==document&&el.nodeName!=='HTML'&&el.nodeName!=='BODY'&&'classList'in el&&'contains'in el.classList){return true}return false}function focusTriggersKeyboardModality(el){var type=el.type;var tagName=el.tagName;if(tagName==='INPUT'&&inputTypesWhitelist[type]&&!el.readOnly){return true}if(tagName==='TEXTAREA'&&!el.readOnly){return true}if(el.isContentEditable){return true}return false}function addFocusVisibleClass(el){if(el.classList.contains('focus-visible')){return}el.classList.add('focus-visible');el.setAttribute('data-focus-visible-added','')}function removeFocusVisibleClass(el){if(!el.hasAttribute('data-focus-visible-added')){return}el.classList.remove('focus-visible');el.removeAttribute('data-focus-visible-added')}function onKeyDown(e){if(e.metaKey||e.altKey||e.ctrlKey){return}if(isValidFocusTarget(scope.activeElement)){addFocusVisibleClass(scope.activeElement)}hadKeyboardEvent=true}function onPointerDown(e){hadKeyboardEvent=false}function onFocus(e){if(!isValidFocusTarget(e.target)){return}if(hadKeyboardEvent||focusTriggersKeyboardModality(e.target)){addFocusVisibleClass(e.target)}}function onBlur(e){if(!isValidFocusTarget(e.target)){return}if(e.target.classList.contains('focus-visible')||e.target.hasAttribute('data-focus-visible-added')){hadFocusVisibleRecently=true;window.clearTimeout(hadFocusVisibleRecentlyTimeout);hadFocusVisibleRecentlyTimeout=window.setTimeout(function(){hadFocusVisibleRecently=false},100);removeFocusVisibleClass(e.target)}}function onVisibilityChange(e){if(document.visibilityState==='hidden'){if(hadFocusVisibleRecently){hadKeyboardEvent=true}addInitialPointerMoveListeners()}}function addInitialPointerMoveListeners(){document.addEventListener('mousemove',onInitialPointerMove);document.addEventListener('mousedown',onInitialPointerMove);document.addEventListener('mouseup',onInitialPointerMove);document.addEventListener('pointermove',onInitialPointerMove);document.addEventListener('pointerdown',onInitialPointerMove);document.addEventListener('pointerup',onInitialPointerMove);document.addEventListener('touchmove',onInitialPointerMove);document.addEventListener('touchstart',onInitialPointerMove);document.addEventListener('touchend',onInitialPointerMove)}function removeInitialPointerMoveListeners(){document.removeEventListener('mousemove',onInitialPointerMove);document.removeEventListener('mousedown',onInitialPointerMove);document.removeEventListener('mouseup',onInitialPointerMove);document.removeEventListener('pointermove',onInitialPointerMove);document.removeEventListener('pointerdown',onInitialPointerMove);document.removeEventListener('pointerup',onInitialPointerMove);document.removeEventListener('touchmove',onInitialPointerMove);document.removeEventListener('touchstart',onInitialPointerMove);document.removeEventListener('touchend',onInitialPointerMove)}function onInitialPointerMove(e){if(e.target.nodeName&&e.target.nodeName.toLowerCase()==='html'){return}hadKeyboardEvent=false;removeInitialPointerMoveListeners()}document.addEventListener('keydown',onKeyDown,true);document.addEventListener('mousedown',onPointerDown,true);document.addEventListener('pointerdown',onPointerDown,true);document.addEventListener('touchstart',onPointerDown,true);document.addEventListener('visibilitychange',onVisibilityChange,true);addInitialPointerMoveListeners();scope.addEventListener('focus',onFocus,true);scope.addEventListener('blur',onBlur,true);if(scope.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&scope.host){scope.host.setAttribute('data-js-focus-visible','')}else if(scope.nodeType===Node.DOCUMENT_NODE){document.documentElement.classList.add('js-focus-visible');document.documentElement.setAttribute('data-js-focus-visible','')}}if(typeof window!=='undefined'&&typeof document!=='undefined'){window.applyFocusVisiblePolyfill=applyFocusVisiblePolyfill;var event;try{event=new CustomEvent('focus-visible-polyfill-ready')}catch(error){event=document.createEvent('CustomEvent');event.initCustomEvent('focus-visible-polyfill-ready',false,false,{})}window.dispatchEvent(event)}if(typeof document!=='undefined'){applyFocusVisiblePolyfill(document)}

for (let index = 0; index < document.querySelectorAll('[tab_button]').length; index++) {
  const element = document.querySelectorAll('[tab_button]')[index];

  alert(element.nextSibling)
}
