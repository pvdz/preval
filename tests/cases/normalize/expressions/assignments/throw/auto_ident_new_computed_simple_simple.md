# Preval test case

# auto_ident_new_computed_simple_simple.md

> normalize > expressions > assignments > throw > auto_ident_new_computed_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
throw (a = new b["$"](1));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpNewCallee = b.$;
a = new tmpNewCallee(1);
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpNewCallee = b.$;
a = new tmpNewCallee(1);
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ [object Object] ]>')

Normalized calls: Same

Final output calls: Same