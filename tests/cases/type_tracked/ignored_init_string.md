# Preval test case

# ignored_init_string.md

> Type tracked > Ignored init string
>
> Updating a binding such that the initial value isn't read allows for a trick that
> improves our internal typing information on that binding in some cases.

## Input

`````js filename=intro
let itooamanumberjack /*:primitive*/ = false;
if (imanumberandilovethrees) {
  itooamanumberjack = String($(1));
} else {
  itooamanumberjack = String($(2));
}
if (itooamanumberjack) {
  $('a', itooamanumberjack);
} else {
  $('b', itooamanumberjack);
}
`````

## Pre Normal


`````js filename=intro
let itooamanumberjack = false;
if (imanumberandilovethrees) {
  itooamanumberjack = String($(1));
} else {
  itooamanumberjack = String($(2));
}
if (itooamanumberjack) {
  $(`a`, itooamanumberjack);
} else {
  $(`b`, itooamanumberjack);
}
`````

## Normalized


`````js filename=intro
let itooamanumberjack = false;
if (imanumberandilovethrees) {
  const tmpStringFirstArg = $(1);
  itooamanumberjack = $coerce(tmpStringFirstArg, `string`);
} else {
  const tmpStringFirstArg$1 = $(2);
  itooamanumberjack = $coerce(tmpStringFirstArg$1, `string`);
}
if (itooamanumberjack) {
  $(`a`, itooamanumberjack);
} else {
  $(`b`, itooamanumberjack);
}
`````

## Output


`````js filename=intro
let itooamanumberjack /*:string*/ = ``;
if (imanumberandilovethrees) {
  const tmpStringFirstArg /*:unknown*/ = $(1);
  itooamanumberjack = $coerce(tmpStringFirstArg, `string`);
} else {
  const tmpStringFirstArg$1 /*:unknown*/ = $(2);
  itooamanumberjack = $coerce(tmpStringFirstArg$1, `string`);
}
if (itooamanumberjack) {
  $(`a`, itooamanumberjack);
} else {
  $(`b`, itooamanumberjack);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = "";
if (imanumberandilovethrees) {
  const b = $( 1 );
  a = $coerce( b, "string" );
}
else {
  const c = $( 2 );
  a = $coerce( c, "string" );
}
if (a) {
  $( "a", a );
}
else {
  $( "b", a );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

imanumberandilovethrees

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
