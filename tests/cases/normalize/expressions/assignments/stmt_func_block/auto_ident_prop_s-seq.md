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

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    let b = { c: 1 };
    let a = { a: 999, b: 1000 };
    a = (1, 2, b).c;
    $(a, b);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let b = { c: 1 };
  let a = { a: 999, b: 1000 };
  const tmpAssignRhsProp = b;
  a = tmpAssignRhsProp.c;
  $(a, b);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const b = { c: 1 };
$(1, b);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 1 };
$( 1, a );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, { c: '1' }
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
