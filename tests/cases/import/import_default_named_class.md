# Preval test case

# import_default.md

> import > import_default
>
> Import statements need special care in our system and our tests

Named classes are default exported as live bindings.

This means that a change to the value of the binding should be reflected by the import.

(Classes are defined as `let` bindings.)

#TODO

## Input

`````js filename=intro
import x from 'x';
$(x); // 10
`````

`````js filename=x
export default class X {};
X = 10;
`````

## Normalized

`````js filename=intro
import { default as x } from 'x';
$(x);
`````

`````js filename=x
let X = class {};
export { X as default };
X = 10;
`````

## Output

`````js filename=intro
import { default as x } from 'x';
$(x);
`````

`````js filename=x
let X = class {};
export { X as default };
X = 10;
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot use import statement outside a module ]>')

Normalized calls: Same

Final output calls: Same
