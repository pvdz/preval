# Preval test case

# auto_ident_new_prop_simple.md

> normalize > expressions > assignments > throw > auto_ident_new_prop_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
throw (a = new b.$(1));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpThrowArg;
const tmpNewCallee = b.$;
const tmpNestedComplexRhs = new tmpNewCallee(1);
a = tmpNestedComplexRhs;
tmpThrowArg = tmpNestedComplexRhs;
throw tmpThrowArg;
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpThrowArg;
const tmpNewCallee = b.$;
const tmpNestedComplexRhs = new tmpNewCallee(1);
a = tmpNestedComplexRhs;
tmpThrowArg = tmpNestedComplexRhs;
throw tmpThrowArg;
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ [object Object] ]>')

Normalized calls: Same

Final output calls: Same
