# Preval test case

# ident_member_simple_simple.md

> normalize > assignment > stmt > ident_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f() {
  let  b = {x: 2}, c = 3;
  let a = (b.x, c).foo;
  $(a, b, c);
}
$(f());
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
a = (b.x, c).foo;
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
let b = { x: 2 };
a = (b.x, 3).foo;
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: null,{"x":2},3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
