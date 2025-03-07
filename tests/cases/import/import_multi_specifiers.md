# Preval test case

# import_multi_specifiers.md

> Import > Import multi specifiers
>
> We want to normalize imports to have exactly one specifier

## Input

`````js filename=intro
import a, {b, c} from "d";
`````

`````js filename=d
export let a = 10;
export let b = 20;
export let c = 30;
export default 100;
`````

## Settled


`````js filename=intro
import { default as a } from 'd';
import { b as b } from 'd';
import { c as c } from 'd';
`````

`````js filename=d
const a /*:number*/ = 10;
export { a };
const b /*:number*/ = 20;
export { b };
const c /*:number*/ = 30;
export { c };
const tmpAnonDefaultExport /*:number*/ = 100;
export { tmpAnonDefaultExport as default };
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
import { default as a } from 'd';
import { b as b } from 'd';
import { c as c } from 'd';
`````

`````js filename=d
const a = 10;
export { a };
const b = 20;
export { b };
const c = 30;
export { c };
const tmpAnonDefaultExport = 100;
export { tmpAnonDefaultExport as default };
`````

## Pre Normal


`````js filename=intro
import a, { b as b, c as c } from 'd';
`````

`````js filename=d
let a = 10;
export { a };
let b = 20;
export { b };
let c = 30;
export { c };
const tmpAnonDefaultExport = 100;
export { tmpAnonDefaultExport as default };
`````

## Normalized


`````js filename=intro
import { default as a } from 'd';
import { b as b } from 'd';
import { c as c } from 'd';
`````

`````js filename=d
let a = 10;
export { a };
let b = 20;
export { b };
let c = 30;
export { c };
const tmpAnonDefaultExport = 100;
export { tmpAnonDefaultExport as default };
`````

## PST Settled
With rename=true

`````js filename=intro
import { default as a } from "d";
import { b as b } from "d";
import { c as c } from "d";
`````

`````js filename=d
import { default as a } from "d";
import { b as b } from "d";
import { c as c } from "d";
`````

## Globals

BAD@! Found 3 implicit global bindings:

a, b, c

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ Cannot use import statement outside a module ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
