export function littleHelper(tag, className){
    const el = document.createElement(tag);
    el.classList.add(className);
    return el;
}
export function appendChildrens(parent, ...chldren){
    chldren.forEach(child => {
        parent.appendChild(child);
    });
    return parent;
}
export function getCookie(name) { 
  const value = `; ${document.cookie}`; // получает куки и ставит перед ним разделитель если есть ключ = значение
  const parts = value.split(`; ${name}=`); // разделяет стркоу на части по разделителю
  if (parts.length === 2) {
    return parts.pop().split(';').shift() // возвращает значение куки, удаляя все лишнее после равно
  };
  return null;
}