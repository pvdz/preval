# Preval test case

# import_default.md

> import > import_default
>
> Import statements need special care in our system and our tests

Named functions are default exported as live bindings.

This means that a change to the value of the binding should be reflected by the import.

(Exported functions are defined as `let` bindings.)

#TODO

## Input

`````js filename=intro
import x from 'x';
$(x); // 10
`````

`````js filename=x
export default function f() {}
f = 10;
`````

## Normalized

`````js filename=intro
import { default as x } from 'x';
$(x);
`````

`````js filename=x
function f() {}
f = 10;
export { f as default };
`````

## Output

`````js filename=intro
import { default as x } from 'x';
$(x);
`````

`````js filename=x
function f() {}
f = 10;
export { f as default };
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot use import statement outside a module ]>')

Normalized calls: Same

Final output calls: Same
