riot.tag2('actionbar', '', '', '', function(opts) {
});
riot.tag2('facepp', '', '', '', function(opts) {
});
riot.tag2('images-slider', '<div class="float-left outline" style="width: 50px; height: 100%;"> <label class="btn-bs-file"><img src="#">Files <input type="file" class="filebutton" accept="image/*" onchange="{readImageFiles}" multiple> </label> <label class="btn-bs-file"><img src="img/icons/open.svg" style="stroke: white;" width="40px">Folder <input type="file" id="image_folder" webkitdirectory mozdirectory msdirectory odirectory directory onchange="readImageFiles(this)"> </label> </div> <div class="float-left left-paddle outline" style="width: 50px; height: 100%;" onclick="{slideleft}"></div> <div class="float-left photolist-wrapper outline" style="width: calc(100% - 160px); height: 100%;"> <div name="photolist" class="photolist"> <img each="{this.thumbnails}" riot-src="{src}" label="{name}" title="{name}" width="{this.thumbnailWidth}"> </div> </div> <div class="right-paddle outline" style="width: 50px; height: 100%;" onclick="{slideright}"></div>', '', '', function(opts) {
        tag = this;
        tag.readImageFiles = readImageFiles;
        tag.readImageFile = readImageFile;
        tag.slideleft = slideleft;
        tag.slideright = slideright;
        tag.deleteThumbnail = deleteThumbnail;

        function readImageFiles(e) {
            var input = e.srcElement;
            if (input.files && input.files[0]) {
                for(i=0;i<input.files.length;i++){
                    this.readImageFile(input.files[i]);
                }
            }
        }
        this.thumbnails = [];
        this.thumbnailWidth= this.opts.thumbnail_width || "80px"
        function readImageFile(f) {
            if(f.type.startsWith("image")){
                var reader = new FileReader();
                reader.onload = e => {
                    var imgData = {
                        name : f.name,
                        src: e.target.result
                    };
                    this.thumbnails.push(imgData);
                    this.trigger("uploadimages");
                }
                reader.onloadend = e => {
                    this.update();
                }
                reader.readAsDataURL(f);
            }
        }

        this.sliding = false;
        this.sliderMove = "80px";
        function slideleft(e) {
            var photolist = $(e.target.nextElementSibling.children[0]);
            if (this.sliding === false) {
                this.sliding = true;
                photolist.css({ left: "-"+this.sliderMove })
                    .prepend(photolist.children('img:last-child'))
                    .animate({ left: 0 }, 200, 'linear', () => {
                        this.sliding = false;
                    });
            }
        };
        function slideright(e) {
            var photolist = $(e.target.previousElementSibling.children[0]);
            if (this.sliding === false) {
                this.sliding = true;
                photolist.animate({ left: "-"+this.sliderMove }, 200, 'linear', () => {
                    photolist.css({ left: 0 })
                        .append(photolist.children('img:first-child'));
                    this.sliding = false;
                });
            }
        };

        function deleteThumbnail(e){
            var thumbnail = $(e.target.nextElementSibling);
            for(var thumbnail_i in this.thumbnails){
                if(this.thumbnails[thumbnail_i].name === $(thumbnail[0]).attr("title")){
                    this.thumbnails.splice(thumbnail_i,1);
                    break;
                }
            }
            this.update();
        }
});
riot.tag2('menu', '', '', '', function(opts) {
});
riot.tag2('statusbar', '', '', '', function(opts) {
});
riot.tag2('toolbox', '<div each="{tool in tools[opts.tools]}" id="{tool.id}" class="tool-button" onclick="{selectme}"> <img class="tool-icon" riot-src="img/icons/{tool.icon}"> <div>{tool.title}</div> </div>', 'toolbox .tool-button,[data-is="toolbox"] .tool-button{ text-align: center; margin: 14px 0px; font-size: 0.9em; } toolbox .tool-icon,[data-is="toolbox"] .tool-icon{ width: 40%; margin: 3px 0px; } toolbox .tool-selected,[data-is="toolbox"] .tool-selected{ background: coral; } toolbox .tool-button:not(.tool-selected):hover,[data-is="toolbox"] .tool-button:not(.tool-selected):hover{ background: grey; }', '', function(opts) {

        var tag = this;
        tag.selectme = selectme;

        function selectme(e){

            $(".tool-selected").removeClass("tool-selected");
            $(e.currentTarget).addClass("tool-selected");

        }
});

riot.tag2('workarea', '', '', '', function(opts) {
});