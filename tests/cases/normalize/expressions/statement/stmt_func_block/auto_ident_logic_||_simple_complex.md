# Preval test case

# auto_ident_logic_||_simple_complex.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident logic || simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    0 || $($(1));
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
    0 || $($(1));
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
  const tmpCalleeParam = $(1);
  tmpCallCallee(tmpCalleeParam);
  $(a);
  return undefined;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
$(tmpCalleeParam);
const a = { a: 999, b: 1000 };
$(a);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
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
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
