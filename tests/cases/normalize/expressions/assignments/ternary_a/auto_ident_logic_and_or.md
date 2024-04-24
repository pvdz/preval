# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = ($($(1)) && $($(1))) || $($(2))) ? $(100) : $(200));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = ($($(1)) && $($(1))) || $($(2))) ? $(100) : $(200));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(1);
a = tmpCallCallee$1(tmpCalleeParam$1);
if (a) {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(1);
  a = tmpCallCallee$3(tmpCalleeParam$3);
} else {
}
if (a) {
} else {
  const tmpCallCallee$5 = $;
  const tmpCalleeParam$5 = $(2);
  a = tmpCallCallee$5(tmpCalleeParam$5);
}
let tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let tmpCalleeParam = undefined;
const tmpCalleeParam$1 = $(1);
let a = $(tmpCalleeParam$1);
if (a) {
  const tmpCalleeParam$3 = $(1);
  a = $(tmpCalleeParam$3);
} else {
}
if (a) {
} else {
  const tmpCalleeParam$5 = $(2);
  a = $(tmpCalleeParam$5);
}
if (a) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
} else {
  tmpCalleeParam = $(200);
  $(tmpCalleeParam);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $( 1 );
let c = $( b );
if (c) {
  const d = $( 1 );
  c = $( d );
}
if (c) {

}
else {
  const e = $( 2 );
  c = $( e );
}
if (c) {
  a = $( 100 );
  $( a );
}
else {
  a = $( 200 );
  $( a );
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 100
 - 6: 100
 - 7: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
