# Preval test case

# auto_ident_new_prop_simple.md

> normalize > expressions > statement > throw > auto_ident_new_prop_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
throw new b.$(1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpNewCallee = b.$;
const tmpThrowArg = new tmpNewCallee(1);
throw tmpThrowArg;
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpNewCallee = b.$;
const tmpThrowArg = new tmpNewCallee(1);
throw tmpThrowArg;
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ [object Object] ]>')

Normalized calls: Same

Final output calls: Same