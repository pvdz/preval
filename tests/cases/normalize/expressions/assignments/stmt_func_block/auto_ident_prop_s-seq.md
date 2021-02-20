# Preval test case

# auto_ident_prop_s-seq.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident prop s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { c: 1 };

    let a = { a: 999, b: 1000 };
    a = (1, 2, b).c;
    $(a, b);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = { c: 1 };
  let a = { a: 999, b: 1000 };
  const tmpAssignRhsProp = b;
  a = tmpAssignRhsProp.c;
  $(a, b);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const b = { c: 1 };
  const SSA_a = b.c;
  $(SSA_a, b);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, { c: '1' }
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
