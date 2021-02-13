# Preval test case

# auto_ident_c-seq.md

> normalize > expressions > assignments > throw > auto_ident_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
throw (a = ($(1), $(2), $(x)));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(1);
$(2);
a = $(x);
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(1);
$(2);
a = $(x);
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - eval returned: ('<crash[ 1 ]>')

Normalized calls: Same

Final output calls: Same