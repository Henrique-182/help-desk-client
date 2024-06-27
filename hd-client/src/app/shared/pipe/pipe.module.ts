import { NgModule } from "@angular/core";
import { BooleanToYnPipe } from "./boolean-to-yn.pipe";

@NgModule({
    declarations: [
        BooleanToYnPipe
    ],
    exports: [
        BooleanToYnPipe
    ]
})
export class PipesModule {

}
