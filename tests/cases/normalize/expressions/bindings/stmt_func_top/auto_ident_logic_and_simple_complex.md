# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident logic and simple complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = 1 && $($(1));
  $(a);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let a = 1 && $($(1));
  $(a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let a = 1;
  if (a) {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    a = tmpCallCallee(tmpCalleeParam);
  } else {
  }
  $(a);
  return undefined;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const a /*:unknown*/ = $(tmpCalleeParam);
$(a);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
$( b );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
