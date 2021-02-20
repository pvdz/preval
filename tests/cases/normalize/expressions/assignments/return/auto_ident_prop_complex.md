# Preval test case

# auto_ident_prop_complex.md

> Normalize > Expressions > Assignments > Return > Auto ident prop complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return (a = $(b).c);
}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
function f() {
  const tmpAssignRhsProp = $(b);
  a = tmpAssignRhsProp.c;
  let tmpReturnArg = a;
  return tmpReturnArg;
}
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
function f() {
  const tmpAssignRhsProp = $(b);
  a = tmpAssignRhsProp.c;
  const tmpReturnArg = a;
  return tmpReturnArg;
}
const b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 1
 - 3: 1, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
