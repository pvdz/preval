# Preval test case

# auto_ident_nested_complex_member_assigns.md

> normalize > expressions > statement > param_default > auto_ident_nested_complex_member_assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  a = y;
}

let a = 1;
const x = 3;
const y = x;

f();

$(100, a);
`````

## Normalized

`````js filename=intro
function f() {
  a = y;
}
let a = 1;
const x = 3;
const y = x;
f();
$(100, a);
`````

## Output

`````js filename=intro
function f() {
  a = 3;
}
let a = 1;
f();
$(100, a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
