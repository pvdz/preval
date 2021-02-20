# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident s-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = ($(1), $(2), x);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
$(1);
$(2);
let a = x;
$(a, x);
`````

## Output

`````js filename=intro
$(1);
$(2);
$(1, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
