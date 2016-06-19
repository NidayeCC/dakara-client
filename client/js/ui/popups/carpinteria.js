/**
 * Created by horacio on 6/17/16.
 */

define(["text!../../../menus/carpinteria.html!strip", 'ui/popups/popup'], function (DOMdata, PopUp) {

    class Carpinteria extends PopUp {
        constructor(game) {

            var options = {
                width:500,
                height:400,
                minWidth:250,
                minHeight:300
            };
            super(DOMdata,options);

            this.game = game;
            this.initCallbacks();
            this.$itemsContainer = $("#carpinteriaContenedorItems");
        }

        /* Items contiene
         Name: Name,
         GrhIndex: GrhIndex,
         Madera: Madera,
         MaderaElfica: MaderaElfica,
         ObjCarpinteroIndex: ObjCarpinteroIndex,
         ObjUpgrade: ObjUpgrade,
         */
        setItems(items){
            //TODO objUpgrade

            var self = this;
            for (var item of items){
                var $row = $('<tr></tr>');

                var numGraf = this.game.assetManager.getNumGraficoFromGrh(item.GrhIndex);
                var url = "url(graficos/" + numGraf + ".png)";

                var $cell = $('<td></td>');
                var $imagenItem = $('<div class="divImagen" style="width: 50px; height:50px;"></div>');
                $imagenItem.css('background-image', url);
                $cell.append($imagenItem);

                $row.append($cell);

                var $cellRequerimientos = $('<td></td>');
                $cellRequerimientos.text('Require madera: ' + item.Madera + " y madera elfica " + item.MaderaElfica);
                // TODO: graficos madera y madera elfica
                $row.append($cellRequerimientos);

                var $cellConstruir = $('<td></td>');
                var $botonConstruir = $('<button class="botonNormal" >CONSTRUIR</button>');

                $botonConstruir.data("itemIndex", item.ObjCarpinteroIndex);
                $botonConstruir.click(function(){
                    var cantidadAConstruir = $('#carpinteriaCantidadAConstruir').val();
                    self.game.client.sendInitCrafting(cantidadAConstruir,cantidadAConstruir);//horrible esto, que se haga de 1 (cambiar sv)
                    var itemIndex = $(this).data("itemIndex");
                    self.game.client.sendCraftCarpenter(itemIndex);
                });
                $cellConstruir.append($botonConstruir);
                $row.append($cellConstruir);
                this.$itemsContainer.append($row);
            }
        }

        initCallbacks(){

        }
    }

    return Carpinteria;
});
