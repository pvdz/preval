# Preval test case

# ssa_problem.md

> closures > ssa_problem
>
> Trying to come up wtih ssa problem cases regarding closures

#TODO

## Input

`````js filename=intro
//f();
let a = 1;
$(a);
f();
a = 3;
$(a);
function f() {
  a = 2;
}
f();
$(a);
a = 4;
`````

## Normalized

`````js filename=intro
function f() {
  a = 2;
}
let a = 1;
$(a);
f();
a = 3;
$(a);
('<hoisted func decl `f`>');
f();
$(a);
a = 4;
`````

## Output

`````js filename=intro
function f() {
  a = 2;
}
let a = 1;
$(a);
f();
a = 3;
$(a);
f();
$(a);
a = 4;
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
