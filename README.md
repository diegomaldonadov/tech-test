En este proyecto accedimos a la websocket que proporcionaba un arreglo con 84 objetos que proporcionaban precios en tiempo de real de diferentes dividas, se utilizo la dependecia "react-websocket": "^2.1.0" para poder utilizar la api. Utilice el hook useEffect para ejecutar la funcion que llama a la api una vez se monta el componente y useState para actulizar los valores del arreglo. 

Pase como prop los datos del arreglo al componente FirstPage, use useRef para almacenar el valor anterior de bid y ask para cada moneda. También cree un estado compareValues para almacenar los valores de comparación y despues use el useEffect que se ejecuta cada cuando data, prevBidRef, o prevAskRef cambian. El useEffect recorre data y compara el valor anterior de bid y ask con el valor actual,si el valor actual es mayor o igual que el valor anterior, entonces se establece el color a "green", de lo contrario se establece el color a "red".
Use libreria de MUI para renderizar el arreglo usando componentes de Container y DataGrid para hacer mas eficiente mostrar el arreglo. 

Comparto un video del funcionamiento de la prueba tecnica.
https://we.tl/t-z3uFTc6u9U
