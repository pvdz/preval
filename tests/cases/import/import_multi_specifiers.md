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
const a /*:number*/ /*truthy*/ = 10;
export { a };
const b /*:number*/ /*truthy*/ = 20;
export { b };
const c /*:number*/ /*truthy*/ = 30;
export { c };
const tmpAnonDefaultExport /*:number*/ /*truthy*/ = 100;
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


## PST Settled
With rename=true

`````js filename=intro
import { default as a } from "d";
import { b as b } from "d";
import { c as c } from "d";
`````

`````js filename=d
const a = 10;
export { a as a };
const b = 20;
export { b as b };
const c = 30;
export { c as c };
const d = 100;
export { d as default };
`````


## Normalized
(This is what phase1 received the first time)

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


## Todos triggered


None


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
