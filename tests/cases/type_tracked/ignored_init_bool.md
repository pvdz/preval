# Preval test case

# ignored_init_bool.md

> Type tracked > Ignored init bool
>
> Updating a binding such that the initial value isn't read allows for a trick that
> improves our internal typing information on that binding in some cases.

I actually don't know what side effect results in null that preval can't predict.

## Input

`````js filename=intro
let itooamanumberjack /*:primitive*/ = 0;
if (imanumberandilovethrees) {
  itooamanumberjack = Boolean($(true));
} else {
  itooamanumberjack = Boolean($(false));
}
if (itooamanumberjack) {
  $('a', itooamanumberjack);
} else {
  $('b', itooamanumberjack);
}
`````

## Pre Normal


`````js filename=intro
let itooamanumberjack = 0;
if (imanumberandilovethrees) {
  itooamanumberjack = Boolean($(true));
} else {
  itooamanumberjack = Boolean($(false));
}
if (itooamanumberjack) {
  $(`a`, itooamanumberjack);
} else {
  $(`b`, itooamanumberjack);
}
`````

## Normalized


`````js filename=intro
let itooamanumberjack = 0;
if (imanumberandilovethrees) {
  const tmpCallCallee = Boolean;
  const tmpCalleeParam = $(true);
  itooamanumberjack = tmpCallCallee(tmpCalleeParam);
} else {
  const tmpCallCallee$1 = Boolean;
  const tmpCalleeParam$1 = $(false);
  itooamanumberjack = tmpCallCallee$1(tmpCalleeParam$1);
}
if (itooamanumberjack) {
  $(`a`, itooamanumberjack);
} else {
  $(`b`, itooamanumberjack);
}
`````

## Output


`````js filename=intro
let itooamanumberjack /*:primitive*/ = 0;
if (imanumberandilovethrees) {
  const tmpCalleeParam = $(true);
  itooamanumberjack = Boolean(tmpCalleeParam);
} else {
  const tmpCalleeParam$1 = $(false);
  itooamanumberjack = Boolean(tmpCalleeParam$1);
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
let a = 0;
if (imanumberandilovethrees) {
  const b = $( true );
  a = Boolean( b );
}
else {
  const c = $( false );
  a = Boolean( c );
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
