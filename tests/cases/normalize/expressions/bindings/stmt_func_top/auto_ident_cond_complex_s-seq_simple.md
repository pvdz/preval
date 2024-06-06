# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident cond complex s-seq simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = $(1) ? (40, 50, 60) : $($(100));
  $(a);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let a = $(1) ? (40, 50, 60) : $($(100));
  $(a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let a = undefined;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    a = 60;
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    a = tmpCallCallee(tmpCalleeParam);
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
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(60);
} else {
  const tmpCalleeParam = $(100);
  const tmpClusterSSA_a = $(tmpCalleeParam);
  $(tmpClusterSSA_a);
}
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 60 );
}
else {
  const b = $( 100 );
  const c = $( b );
  $( c );
}
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
