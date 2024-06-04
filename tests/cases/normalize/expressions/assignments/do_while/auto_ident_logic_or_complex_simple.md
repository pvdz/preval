# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident logic or complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($(0)) || 2));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = $($(0)) || 2)) {
  } else {
    break;
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  a = tmpCallCallee(tmpCalleeParam);
  if (a) {
  } else {
    a = 2;
  }
  let tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
$(100);
const tmpCalleeParam = $(0);
let a = $(tmpCalleeParam);
if (a) {
} else {
  a = 2;
}
$(100);
const tmpCalleeParam$1 = $(0);
a = $(tmpCalleeParam$1);
if (a) {
} else {
  a = 2;
}
$(100);
const tmpCalleeParam$2 = $(0);
a = $(tmpCalleeParam$2);
if (a) {
} else {
  a = 2;
}
$(100);
const tmpCalleeParam$3 = $(0);
a = $(tmpCalleeParam$3);
if (a) {
} else {
  a = 2;
}
$(100);
const tmpCalleeParam$4 = $(0);
a = $(tmpCalleeParam$4);
if (a) {
} else {
  a = 2;
}
$(100);
const tmpCalleeParam$5 = $(0);
a = $(tmpCalleeParam$5);
if (a) {
} else {
  a = 2;
}
$(100);
const tmpCalleeParam$6 = $(0);
a = $(tmpCalleeParam$6);
if (a) {
} else {
  a = 2;
}
$(100);
const tmpCalleeParam$7 = $(0);
a = $(tmpCalleeParam$7);
if (a) {
} else {
  a = 2;
}
$(100);
const tmpCalleeParam$8 = $(0);
a = $(tmpCalleeParam$8);
if (a) {
} else {
  a = 2;
}
$(100);
const tmpCalleeParam$9 = $(0);
a = $(tmpCalleeParam$9);
if (a) {
} else {
  a = 2;
}
$(100);
const tmpCalleeParam$10 = $(0);
a = $(tmpCalleeParam$10);
if (a) {
} else {
  a = 2;
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpCalleeParam$11 = $(0);
  a = $(tmpCalleeParam$11);
  if (a) {
  } else {
    a = 2;
  }
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  b = 2;
}
$( 100 );
const c = $( 0 );
b = $( c );
if (b) {

}
else {
  b = 2;
}
$( 100 );
const d = $( 0 );
b = $( d );
if (b) {

}
else {
  b = 2;
}
$( 100 );
const e = $( 0 );
b = $( e );
if (b) {

}
else {
  b = 2;
}
$( 100 );
const f = $( 0 );
b = $( f );
if (b) {

}
else {
  b = 2;
}
$( 100 );
const g = $( 0 );
b = $( g );
if (b) {

}
else {
  b = 2;
}
$( 100 );
const h = $( 0 );
b = $( h );
if (b) {

}
else {
  b = 2;
}
$( 100 );
const i = $( 0 );
b = $( i );
if (b) {

}
else {
  b = 2;
}
$( 100 );
const j = $( 0 );
b = $( j );
if (b) {

}
else {
  b = 2;
}
$( 100 );
const k = $( 0 );
b = $( k );
if (b) {

}
else {
  b = 2;
}
$( 100 );
const l = $( 0 );
b = $( l );
if (b) {

}
else {
  b = 2;
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const m = $( 0 );
  b = $( m );
  if (b) {

  }
  else {
    b = 2;
  }
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 0
 - 3: 0
 - 4: 100
 - 5: 0
 - 6: 0
 - 7: 100
 - 8: 0
 - 9: 0
 - 10: 100
 - 11: 0
 - 12: 0
 - 13: 100
 - 14: 0
 - 15: 0
 - 16: 100
 - 17: 0
 - 18: 0
 - 19: 100
 - 20: 0
 - 21: 0
 - 22: 100
 - 23: 0
 - 24: 0
 - 25: 100
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
