# Preval test case

# auto_ident_call_ident_complex_args.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident call ident complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let b = { $ };

    let a = { a: 999, b: 1000 };
    a = $($(1), $(2));
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
    let b = { $: $ };
    let a = { a: 999, b: 1000 };
    a = $($(1), $(2));
    $(a);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let b = { $: $ };
  let a = { a: 999, b: 1000 };
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
  return undefined;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$1(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
const a /*:unknown*/ = $(tmpCalleeParam, tmpCalleeParam$1);
$(a);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = $( a, b );
$( c );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 1
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
