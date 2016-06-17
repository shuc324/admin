/**
 * Created by shuc on 16/5/30.
 */
"use strict";
import app from "./library/application";
import route from "./http/route";

route.start(new app(__dirname));