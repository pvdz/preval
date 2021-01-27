# Preval test case

# ident_computed_member_complex_bin.md

> normalize > assignment > stmt > ident_computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f(){
if ($(true)) {
let b = {x: 2}, c = 3, d = 4;
  let a= $(b)[$('x')] = c + d;
  $(a, b, c);
}
}
$(f());
`````
## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
a = $(b)[$('x')] = c + d;
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
let b = { x: 2 };
a = $(b)[$('x')] = 7;
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: {"x":7}
 - 1: "x"
 - 2: 7,{"x":7},3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 7 }], ['x'], [7, { x: 7 }, 7], null];

