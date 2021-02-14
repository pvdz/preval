# Preval test case

# import_multi_specifiers.md

> import > import_multi_specifiers
>
> We want to normalize imports to have exactly one specifier

#TODO

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
const tmpExportDefault = 100;
export { tmpExportDefault as default };
`````

## Output

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
const tmpExportDefault = 100;
export { tmpExportDefault as default };
`````

## Globals

BAD@! Found 3 implicit global bindings:

a, b, c

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot use import statement outside a module ]>')

Normalized calls: Same

Final output calls: Same
