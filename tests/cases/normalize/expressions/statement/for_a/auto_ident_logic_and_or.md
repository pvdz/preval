# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > For a > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (($($(1)) && $($(1))) || $($(2)); $(0); );
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  ($($(1)) && $($(1))) || $($(2));
  while ($(0)) {}
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpIfTest = tmpCallCallee(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
} else {
}
if (tmpIfTest) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  tmpCallCallee$3(tmpCalleeParam$3);
}
let tmpIfTest$1 = $(0);
while (true) {
  if (tmpIfTest$1) {
    tmpIfTest$1 = $(0);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
let tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCalleeParam$1 = $(1);
  tmpIfTest = $(tmpCalleeParam$1);
} else {
}
if (tmpIfTest) {
} else {
  const tmpCalleeParam$3 = $(2);
  $(tmpCalleeParam$3);
}
const tmpIfTest$1 = $(0);
if (tmpIfTest$1) {
  let tmpClusterSSA_tmpIfTest$1 = $(0);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest$1) {
      tmpClusterSSA_tmpIfTest$1 = $(0);
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
}
if (b) {

}
else {
  const d = $( 2 );
  $( d );
}
const e = $( 0 );
if (e) {
  let f = $( 0 );
  while ($LOOP_UNROLL_10) {
    if (f) {
      f = $( 0 );
    }
    else {
      break;
    }
  }
}
const g = {
  a: 999,
  b: 1000,
};
$( g );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 0
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
