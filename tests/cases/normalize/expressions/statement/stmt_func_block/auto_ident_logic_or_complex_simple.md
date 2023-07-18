# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    $($(0)) || 2;
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    let a = { a: 999, b: 1000 };
    $($(0)) || 2;
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  const tmpIfTest = tmpCallCallee(tmpCalleeParam);
  $(a);
  return undefined;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(0);
$(tmpCalleeParam);
const a = { a: 999, b: 1000 };
$(a);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
$( a );
const b = {
a: 999,
b: 1000
;
$( b );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: { a: '999', b: '1000' }
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
