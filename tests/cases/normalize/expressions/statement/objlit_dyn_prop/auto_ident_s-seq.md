# Preval test case

# auto_ident_s-seq.md

> normalize > expressions > statement > objlit_dyn_prop > auto_ident_s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
({ [($(1), $(2), x)]: 10 });
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(1);
$(2);
x;
10;
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1);
$(2);
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
