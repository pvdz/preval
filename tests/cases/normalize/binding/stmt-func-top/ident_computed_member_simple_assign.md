# Preval test case

# ident_computed_member_simple_assign.md

> normalize > assignment > stmt > ident_computed_member_simple_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f() {
  let  b = {x: 2}, c = 3, d = 4;
  let a = b[$('x')] = $(c)[$('y')] = $(d);
  $(a, b, c);
}
$(f());
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
a = b[$('x')] = $(c)[$('y')] = $(d);
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
let b = { x: 2 };
a = b[$('x')] = $(3)[$('y')] = $(4);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: 3
 - 2: "y"
 - 3: 4
 - 4: 4,{"x":4},3
 - 5: undefined

Normalized calls: Same

Final output calls: Same
