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

## Output


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

## PST Output

With rename=true

`````js filename=intro
const a = 10;
export { a as a };
const b = 20;
export { b as b };
const c = 30;
export { c as c };
const a = 100;
export { a as default };
`````

`````js filename=d
const a = 10;
export { a as a };
const b = 20;
export { b as b };
const c = 30;
export { c as c };
const a = 100;
export { a as default };
`````

## Globals

BAD@! Found 3 implicit global bindings:

a, b, c

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot use import statement outside a module ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
