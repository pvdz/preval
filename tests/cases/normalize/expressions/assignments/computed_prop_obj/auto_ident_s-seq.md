# Preval test case

# auto_ident_s-seq.md

> normalize > expressions > assignments > computed_prop_obj > auto_ident_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
let obj = {};
(a = ($(1), $(2), x))["a"];
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let obj = {};
$(1);
$(2);
a = x;
let tmpCompObj = a;
tmpCompObj.a;
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
$(1);
$(2);
a = 1;
let tmpCompObj = a;
tmpCompObj.a;
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
