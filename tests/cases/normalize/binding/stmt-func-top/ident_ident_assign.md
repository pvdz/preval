# Preval test case

# ident_ident_assign.md

> normalize > assignment > stmt > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f() {
  let  b = 2, c = 3, d = 4;
  let a = b = $(c).y = $(d);
  $(a, b, c);
}
$(f());
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
let d = 4;
a = b = $(c).y = $(d);
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
let b = 2;
a = b = $(3).y = $(4);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 3
 - 1: 4
 - 2: 4,4,3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
