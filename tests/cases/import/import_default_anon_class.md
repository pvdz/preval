# Preval test case

# import_default.md

> import > import_default
>
> Import statements need special care in our system and our tests

Anonymous functions are exported as frozen bindings. There is no way to change them, anyways.

Their name should also be `'default'`, and we have no alternative transform available for this. We could use Object.defineProperty though.

#TODO

## Input

`````js filename=intro
import x from 'x';
$(x);
$(x.name);
`````

`````js filename=x
export default class X {};
`````

## Normalized

`````js filename=intro
import { default as x } from 'x';
$(x);
const tmpCallCallee = $;
const tmpCalleeParam = x.name;
tmpCallCallee(tmpCalleeParam);
`````

`````js filename=x
let X = class {};
export { X as default };
`````

## Output

`````js filename=intro
import { default as x } from 'x';
$(x);
const tmpCalleeParam = x.name;
$(tmpCalleeParam);
`````

`````js filename=x
let X = class {};
export { X as default };
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot use import statement outside a module ]>')

Normalized calls: Same

Final output calls: Same
