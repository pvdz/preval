# Preval test case

# global_ident.md

> Normalize > Nullish > Global ident
>
> Ident property access should not be changed

#TODO

## Input

`````js filename=intro
$(parseInt??foo);
`````

## Pre Normal


`````js filename=intro
$(parseInt ?? foo);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
let tmpCalleeParam = parseInt;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = foo;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpIfTest = parseInt == null;
if (tmpIfTest) {
  foo;
  $(foo);
} else {
  $(parseInt);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = parseInt == null;
if (a) {
  foo;
  $( foo );
}
else {
  $( parseInt );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

foo

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
