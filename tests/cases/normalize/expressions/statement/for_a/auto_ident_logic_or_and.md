# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > For a > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ($($(0)) || ($($(1)) && $($(2))); $(0); );
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  $($(0)) || ($($(1)) && $($(2)));
  while ($(0)) {}
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
const tmpIfTest = tmpCallCallee(tmpCalleeParam);
if (tmpIfTest) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  const tmpIfTest$1 = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpIfTest$1) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    tmpCallCallee$3(tmpCalleeParam$3);
  } else {
  }
}
let tmpIfTest$3 = $(0);
while (true) {
  if (tmpIfTest$3) {
    tmpIfTest$3 = $(0);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(0);
const tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 = $(1);
  const tmpIfTest$1 = $(tmpCalleeParam$1);
  if (tmpIfTest$1) {
    const tmpCalleeParam$3 = $(2);
    $(tmpCalleeParam$3);
  } else {
  }
}
const tmpIfTest$3 = $(0);
if (tmpIfTest$3) {
  let tmpClusterSSA_tmpIfTest$3 = $(0);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest$3) {
      tmpClusterSSA_tmpIfTest$3 = $(0);
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
const a = $( 0 );
const b = $( a );
if (b) {

}
else {
  const c = $( 1 );
  const d = $( c );
  if (d) {
    const e = $( 2 );
    $( e );
  }
}
const f = $( 0 );
if (f) {
  let g = $( 0 );
  while ($LOOP_UNROLL_10) {
    if (g) {
      g = $( 0 );
    }
    else {
      break;
    }
  }
}
const h = {
  a: 999,
  b: 1000,
};
$( h );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 0
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
