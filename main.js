            
            /**
             * Daniel export pdf dbPouch
             * documentacion oficial - pdf
             * https://github.com/parallax/jsPDF
             * documentacion persistencia en el navegador
             * https://pouchdb.com/
             */
            let mostrarDatosHtmlPdf = () => {  

                const db = new PouchDB('pdfBase64');
                db.allDocs(
                        { 
                            include_docs: true 
                        }, 
                (error, docs) => {
                    if (error) {
                        console.log(error);
                    } else {
                        db.info().then(function (result) {
                            console.log('resultados obtenidos: '+result.doc_count);
                            const contador = result.doc_count;
                            if (contador == 0) {
                                console.log("no hay contenido para mostrar");
                            }
                        })
                        const data = docs.rows;
                        //let html;
                        let renderHtml = document.getElementById("renderHtmlPdf");
                        //console.log(JsBarcode);
                        
                        
                        
                        for (var i = 0; i < 100; i++) {  
                            const datosBrutosPdf = data[i].doc;
                            console.log(datosBrutosPdf.idRadicado);
                            
                                    //exportar pdf
                                    var doc = new jsPDF({
                                        orientation: 'landscape'
                                        //format: [200, 500]
                                    });
                                    
                                    JsBarcode("#barcode_", datosBrutosPdf.idRadicado, {
                                      format: "codabar",
                                      lineColor: "#000",
                                      width: 4,
                                      height: 40,
                                      displayValue: true
                                    });
                                    let BarCodeIdRadicado = $("#barcode_").attr('src');
                                    console.log(BarCodeIdRadicado);
                                    
                                    
                                    doc.setFontSize(10);
                                    doc.text(20, 20, `ACTA DE APREHENSIÓN DE BEBIDAS ALCOHÓLICAS, TABACOS Y CIGARRILLOS`);
                                    //barcode
                                    doc.addImage(BarCodeIdRadicado,'PNG',200,20, 90, 25,'barcode', 'MEDIUM', 0);
                                    
                                    doc.text(20, 30, `Señor `+datosBrutosPdf.nombrePropietario+` el tramite con el cual se inicio su proceso de inspeccion, vigilancia y control ante la
gobernacion de antioquia es con el numero de Radicado `+datosBrutosPdf.idRadicado+` Acta de aprehensión 20221920, el
establecimiento y/o propieratario tuvo hallazgos en la fecha: `+datosBrutosPdf.fechaRadicado);
                                    doc.text(20, 45, `En el día `+datosBrutosPdf.fechaRadicado+` siendo las `+datosBrutosPdf.horaRadicado+` se dió inicio a la diligencia de inspección y verificación
correspondiente a monopolio de licores e impuesto al consumo de vinos, aperitivos y similares; cigarrillo y
tabaco elaborado; así como de cervezas, ordenado por la Secretaría de Hacienda y el Subsecretario de
Ingresos del Departamento de Antioquia, conforme a lo establecido en la Ley 1762 de 2015, Ley 223 de
1995, Decreto 1625 de 2016 y la ordenanza 41 de 2020.`);
                                    doc.text(20, 68, `Acta de aprehensión número: `+datosBrutosPdf.numeroActa+`
Ubicación: `+datosBrutosPdf.direccion+`
Nombre del funcionario encargado de la diligencia: `+datosBrutosPdf.nombreApoyo+`
C.C. del funcionario encargado de la diligencia: `+datosBrutosPdf.ccApoyo+`
Cargo: `+datosBrutosPdf.cargo);
                                    doc.text(20, 95, `TIPO OPERATIVO:
    `+datosBrutosPdf.tipoOperativoEstablecimiento+` 
    `+datosBrutosPdf.tipoOperativoOtro);
                                    
                                    doc.text(20, 112, `INFORMACIÓN DEL ESTABLECIMIENTO 
    Nombre o razón social: `+datosBrutosPdf.razonSocial+`
    Nit / Rut: `+datosBrutosPdf.nit);
                                    
                                    doc.text(20, 128, `TIPO
    `+datosBrutosPdf.tipoLocal+ ` - `+datosBrutosPdf.tipoOtro);
                                    
                                    doc.text(20, 140, `PROPIETARIO
    Ubicación: `+datosBrutosPdf.direccion+` 
    Teléfono: `+datosBrutosPdf.telefono+`
    Ciudad: `+datosBrutosPdf.ciudad+`
    Nombre del propietario: `+datosBrutosPdf.nombrePropietario+`
    C.C. del propietario: `+datosBrutosPdf.cedulaPropietario+`
    Firma de propietario:`);
    doc.addImage(datosBrutosPdf.firma1,'PNG',20,165, 80, 35,'firma1', 'MEDIUM', 100);
    
                                    //añade imagen
                                    //doc.addImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=','PNG',20,50, 10, 10,'times', 'MEDIUM', 0);
                                    
                                    doc.addPage();
                                    doc.text(20, 20, `Información del responsable o tenedor de la mercancía, conductor y/o vehículoCorreos electrónicos para notificación al rep. legal, administrador o responsable`);
                                    doc.text(20, 30, `ELEMENTOS APREHENDIDOS
    *numero: `+datosBrutosPdf.elemento_numero_1 +` 
    *clase: `+datosBrutosPdf.elemento_clase_1 +`
    *origen: `+datosBrutosPdf.elemento_origen_1 + `
    *descripcion: `+datosBrutosPdf.elemento_descripcion_1 + `
    *medida: `+datosBrutosPdf.elemento_medida_1 + `
    *capacidad: `+datosBrutosPdf.elemento_capacidad_1 + `
    *cantidad: `+datosBrutosPdf.elemento_cantidad_1 + `
    *alcohol: `+datosBrutosPdf.elemento_alcohol_1 + `
    *estado: `+datosBrutosPdf.elemento_estado_1 + `
    *valor: `+datosBrutosPdf.elemento_valor_1 + `
    *motivo: `+datosBrutosPdf.elemento_motivo_1 + `
    *regimen: `+datosBrutosPdf.elemento_regimen_1);
                                    doc.text(20, 85, `APLICA CAPTURA
    `+datosBrutosPdf.captura+`
APLICA CIERRE
    `+datosBrutosPdf.aplicaCierre);
                                    doc.text(20, 105, `OBSERVACIONES Y RESPUESTA DEL PRESUNTO CONTRAVENTOR
    `+datosBrutosPdf.comentarios);
                                    doc.text(20, 118, `DILIGENCIA CON EL APOYO DE LAS SIGUIENTES ENTIDADES
    `+datosBrutosPdf.apoyoEntidad);
                                    doc.text(20, 130, `FIRMA DEL RESPOSABLE O TENEDOR:
    Nombre: `+datosBrutosPdf.nombreResponsable+`, 
    CC: `+datosBrutosPdf.ccResponsable);
    doc.addImage(datosBrutosPdf.firma4,'PNG',20,134, 80, 35,'firma4', 'MEDIUM', 0);
    
  
                                    doc.addPage(); //se añade una pagina nueva a la plataforma
                                    doc.text(20, 20, `FIRMA FUNCIONARIO 1:
    Nombre: `+datosBrutosPdf.nombreFuncionario1+`, 
    CC: `+datosBrutosPdf.ccFuncionario1);
    doc.addImage(datosBrutosPdf.firma5,'PNG',20,26, 80, 35,'firma5', 'MEDIUM', 0);
    
                                    doc.text(20, 65, `FIRMA FUNCIONARIO 2:
    Nombre: `+datosBrutosPdf.nombreFuncionario2+`, 
    CC: `+datosBrutosPdf.ccFuncionario2);
    doc.addImage(datosBrutosPdf.firma6,'PNG',20,73, 80, 35,'firma6', 'MEDIUM', 0);
//   
                                    doc.text(20, 120, `FIRMA DEL FUNCIONARIO QUE APOYA LA DILIGENCIA:
    Nombre: `+datosBrutosPdf.nombreApoyo+`, 
    CC: `+datosBrutosPdf.ccApoyo);
    doc.addImage(datosBrutosPdf.firma7,'PNG',20,135, 100, 35,'firma7', 'MEDIUM', 0);
//            
                                    doc.setFontSize(9);
                                    doc.text(80, 180, `Por medio de la presente, se dispone a dar traslado de las actas de aprehesion diligenciadas por el
grupo operativo en las vistas de inspeccion, vigilancia y control realizadas a diferentes establesimientos de
comercio; para que en el area de sustancias de la subsecretaria de ingresos, se proceda con el inicio de las
actuaciones administrativas sancionatorias a que haya lugar, por la comision de presuntas contravensiones al
regimen de rentas del departamento de antioquia por lo anterior, se procede a darle el traslado de las actas de
aprehesion y sus anexos.`);
        
                                    // Save the PDF
                                    doc.save('documento-final.pdf');
                                    console.log(datosBrutosPdf);
                                
                        }
                    }
                }); 
            }
            mostrarDatosHtmlPdf();
            
            let guardarPdfHtml = () => {
                
                const fechaForm = new Date();
                const fecha = Date.now(); //para el id de la base de datos en el browser 
                document.getElementById("fecha").value = fechaForm.toJSON().slice(0,10);
                const horaActa = document.getElementById("hora");
                //variables
                /*
                 * nro_acta
                 * ubicacion
                 * nombre_encargado
                 * cc_encargado
                 * cargo
                 * direccion
                 * telefono
                 * ciudad
                 * nombre_propietario
                 * cc_propietario
                 */
                const numeroActa = document.getElementById("nro_acta");
                const radicadoIdentificador = document.getElementById("radicadoIdentificador");
                const ubicacion = document.getElementById("ubicacion");
                const nombreEncargado = document.getElementById("nombre_encargado");
                const cedulaEncargado = document.getElementById("cc_encargado");
                const cargo = document.getElementById("cargo");
                const direccion = document.getElementById("direccion");
                const telefono = document.getElementById("telefono");
                const ciudad = document.getElementById("ciudad");
                const nombrePropietario = document.getElementById("nombre_propietario");
                const cedulaPropietario = document.getElementById("cc_propietario");
                const tipoOperativoOtro = document.getElementById("tipo_operativo_otro");
                const tipoOperativoEstablecimiento = document.getElementById("en_establecimiento");
                const nit = document.getElementById("nit");
                const razonSocial = document.getElementById("razon_social");
                const tipoLocal = document.getElementById("tipo_local");
                //const tipoBodega = document.getElementById("tipo_bodega");
                const tipoOtro = document.getElementById("tipo_otro");
                const elementoDisposicion = document.getElementById("elemento_disposicion");
                const captura = document.getElementById("aplica_captura");
                //const capturaNo = document.getElementById("aplica_captura_no");
                const aplicaCierre = document.getElementById("aplica_cierre");
                const comentarios = document.getElementById("observaciones_elemento");
                
                //apoyo entidades de seguridad
                let apoyoEntidad = document.getElementById("data_conApoyo");
                
                const nombreResponsable = document.getElementById("nombre_responsable");
                const ccResponsable = document.getElementById("cc_responsable");
                //funcionario1
                const nombreFuncionario1 = document.getElementById("nombre_funcionario_1");
                const ccFuncionario1 = document.getElementById("cc_funcionario_1");
                //funcionario2
                const nombreFuncionario2 = document.getElementById("nombre_funcionario_2");
                const ccFuncionario2 = document.getElementById("cc_funcionario_2");
                //apoyo
                const nombreApoyo = document.getElementById("nombre_apoyo");
                const ccApoyo = document.getElementById("cc_apoyo");
                
                //firmas
                const canvas1 = document.getElementById("lienzo_1");
                const canvas2 = document.getElementById("lienzo_3");
                const canvas4 = document.getElementById("lienzo_4");
                const canvas5 = document.getElementById("lienzo_5");
                const canvas6 = document.getElementById("lienzo_6");
                const canvas7 = document.getElementById("lienzo_7");
                
                //datos de los items apreendidos
                const elemento_numero_1 = document.getElementById("elemento_numero_1");
                const elemento_clase_1 = document.getElementById("elemento_clase_1");
                const elemento_origen_1 = document.getElementById("elemento_origen_1");
                const elemento_descripcion_1 = document.getElementById("elemento_descripcion_1");
                const elemento_medida_1 = document.getElementById("elemento_medida__1");
                const elemento_capacidad_1 = document.getElementById("elemento_capacidad__1");
                const elemento_cantidad_1 = document.getElementById("elemento_cantidad__1");
                const elemento_alcohol_1 = document.getElementById("elemento_alcohol__1");
                const elemento_estado_1 = document.getElementById("elemento_estado__1");
                const elemento_valor_1 = document.getElementById("elemento_valor__1");
                const elemento_motivo_1 = document.getElementById("elemento_motivo_1");
                const elemento_regimen_1 = document.getElementById("regimen_1");
                
//                const validarContDinamico = $("#elementos")[0].children.length;
//                if(validarContDinamico < 0){
//                    alert($("#elementos")[0].children.length + " Elementos aprehendidos para enviar, ingrese uno por favor");
//                    console.log($("#elementos")[0].children.length);
//                }else{
//                    guardarPdfHtml();
//                }
                

                //resultados por consola
                console.log(numeroActa.value);
                console.log(fecha);
                
                const db = new PouchDB('pdfBase64');
                db.put({
                    _id: fecha.toString(), //id para indentificar
                    numeroActa: numeroActa.value,
                    fechaRadicado: fechaForm,
                    horaRadicado: horaActa.value,
                    idRadicado: radicadoIdentificador.value,
                    ubicacion: ubicacion.value,
                    nombreEncargado: nombreEncargado.value,
                    cedulaEncargado: cedulaEncargado.value,
                    cargo: cargo.value,
                    direccion: direccion.value,
                    telefono: telefono.value,
                    ciudad: ciudad.value,
                    nombrePropietario: nombrePropietario.value,
                    cedulaPropietario: cedulaPropietario.value,
                    tipoOperativoOtro: tipoOperativoOtro.value,
                    tipoOperativoEstablecimiento: tipoOperativoEstablecimiento.value,
                    nit: nit.value,
                    razonSocial: razonSocial.value,
                    tipoLocal: tipoLocal.value,
                    tipoOtro: tipoOtro.value,
                    elementoDisposicion: elementoDisposicion.value,
                    captura: captura.value,
                    aplicaCierre: aplicaCierre.value,
                    comentarios: comentarios.value,
                    
                    //---apoyan
                    apoyoEntidad: apoyoEntidad.value,
                    //---apoyan
                    
                    //----datos de los items apreendidos                  
                    elemento_numero_1: elemento_numero_1.value,
                    elemento_clase_1: elemento_clase_1.value,
                    elemento_origen_1: elemento_origen_1.value,
                    elemento_descripcion_1: elemento_descripcion_1.value,
                    elemento_medida_1: elemento_medida_1.value,
                    elemento_capacidad_1: elemento_capacidad_1.value,
                    elemento_cantidad_1:  elemento_cantidad_1.value,
                    elemento_alcohol_1:  elemento_alcohol_1.value,
                    elemento_estado_1:  elemento_estado_1.value,
                    elemento_valor_1: elemento_valor_1.value,
                    elemento_motivo_1: elemento_motivo_1.value,
                    elemento_regimen_1: elemento_regimen_1.value,
                    //----datos de los items apreendidos
                    
                    nombreResponsable: nombreResponsable.value,
                    ccResponsable: ccResponsable.value,
                    nombreFuncionario1: nombreFuncionario1.value,
                    ccFuncionario1: ccFuncionario1.value,
                    nombreFuncionario2: nombreFuncionario2.value,
                    ccFuncionario2: ccFuncionario2.value,
                    nombreApoyo: nombreApoyo.value,
                    ccApoyo: ccApoyo.value,
                    firma1: canvas1.toDataURL(), 
                    firma2: canvas2.toDataURL(),
                    firma4: canvas4.toDataURL(),
                    firma5: canvas5.toDataURL(),
                    firma6: canvas6.toDataURL(),
                    firma7: canvas7.toDataURL()
                }).then(function (response){
                    console.log(response);
                    //get  
                }).catch(function (err){
                    console.log(err);
                });
            }
            
            $(document).ready(function(){
                $(".boton-data").on('change', function(){
                   if($(this).prop('checked') == true){
                       const data = $("#data_conApoyo").val($(this)[0].labels[0].innerText);
                       console.log($(this)[0].labels[0].innerText);
                   }else{
                       $("#data_conApoyo").val("");
                   }
                }); 
            });
            //- Daniel export pdf dbPouch