/**
 * Created by shuc on 16/5/30.
 */
"use strict";
import express from "express";
import app from "./library/application";

let route = new app(__dirname);

route.use(express.static(__dirname + "/public"));

route.use('/test_service');

route.start();