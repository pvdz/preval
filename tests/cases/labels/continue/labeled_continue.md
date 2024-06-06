# Preval test case

# labeled_continue.md

> Labels > Continue > Labeled continue
>
> 

#TODO

## Input

`````js filename=intro
let x = $(1);
A: while (true) {
  while (true) {
    $(x);
    x = $(2);
    if ($) {
      continue A;
    }
    x = $(3);
    $(x);
    break;
  }
}
$(x); // unreachable
`````

## Pre Normal

`````js filename=intro
let x = $(1);
A: while (true) {
  $continue: {
    {
      while (true) {
        $(x);
        x = $(2);
        if ($) {
          break $continue;
        }
        x = $(3);
        $(x);
        break;
      }
    }
  }
}
$(x);
`````

## Normalized

`````js filename=intro
let x = $(1);
while (true) {
  $continue: {
    unlabeledBreak: {
      $(x);
      x = $(2);
      if ($) {
        break $continue;
      } else {
        x = $(3);
        $(x);
        break unlabeledBreak;
      }
    }
  }
}
$(x);
`````

## Output

`````js filename=intro
const x = $(1);
$(x);
let tmpClusterSSA_x = $(2);
if ($) {
} else {
  tmpClusterSSA_x = $(3);
  $(tmpClusterSSA_x);
}
$(tmpClusterSSA_x);
let tmpClusterSSA_x$1 = $(2);
if ($) {
} else {
  tmpClusterSSA_x$1 = $(3);
  $(tmpClusterSSA_x$1);
}
$(tmpClusterSSA_x$1);
let tmpClusterSSA_x$2 = $(2);
if ($) {
} else {
  tmpClusterSSA_x$2 = $(3);
  $(tmpClusterSSA_x$2);
}
$(tmpClusterSSA_x$2);
let tmpClusterSSA_x$3 = $(2);
if ($) {
} else {
  tmpClusterSSA_x$3 = $(3);
  $(tmpClusterSSA_x$3);
}
$(tmpClusterSSA_x$3);
let tmpClusterSSA_x$4 = $(2);
if ($) {
} else {
  tmpClusterSSA_x$4 = $(3);
  $(tmpClusterSSA_x$4);
}
$(tmpClusterSSA_x$4);
let tmpClusterSSA_x$5 = $(2);
if ($) {
} else {
  tmpClusterSSA_x$5 = $(3);
  $(tmpClusterSSA_x$5);
}
$(tmpClusterSSA_x$5);
let tmpClusterSSA_x$6 = $(2);
if ($) {
} else {
  tmpClusterSSA_x$6 = $(3);
  $(tmpClusterSSA_x$6);
}
$(tmpClusterSSA_x$6);
let tmpClusterSSA_x$7 = $(2);
if ($) {
} else {
  tmpClusterSSA_x$7 = $(3);
  $(tmpClusterSSA_x$7);
}
$(tmpClusterSSA_x$7);
let tmpClusterSSA_x$8 = $(2);
if ($) {
} else {
  tmpClusterSSA_x$8 = $(3);
  $(tmpClusterSSA_x$8);
}
$(tmpClusterSSA_x$8);
let tmpClusterSSA_x$9 = $(2);
if ($) {
} else {
  tmpClusterSSA_x$9 = $(3);
  $(tmpClusterSSA_x$9);
}
$(tmpClusterSSA_x$9);
let tmpClusterSSA_x$10 = $(2);
if ($) {
} else {
  tmpClusterSSA_x$10 = $(3);
  $(tmpClusterSSA_x$10);
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(tmpClusterSSA_x$10);
  tmpClusterSSA_x$10 = $(2);
  if ($) {
  } else {
    tmpClusterSSA_x$10 = $(3);
    $(tmpClusterSSA_x$10);
  }
}
$(tmpClusterSSA_x$10);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
let b = $( 2 );
if ($) {

}
else {
  b = $( 3 );
  $( b );
}
$( b );
let c = $( 2 );
if ($) {

}
else {
  c = $( 3 );
  $( c );
}
$( c );
let d = $( 2 );
if ($) {

}
else {
  d = $( 3 );
  $( d );
}
$( d );
let e = $( 2 );
if ($) {

}
else {
  e = $( 3 );
  $( e );
}
$( e );
let f = $( 2 );
if ($) {

}
else {
  f = $( 3 );
  $( f );
}
$( f );
let g = $( 2 );
if ($) {

}
else {
  g = $( 3 );
  $( g );
}
$( g );
let h = $( 2 );
if ($) {

}
else {
  h = $( 3 );
  $( h );
}
$( h );
let i = $( 2 );
if ($) {

}
else {
  i = $( 3 );
  $( i );
}
$( i );
let j = $( 2 );
if ($) {

}
else {
  j = $( 3 );
  $( j );
}
$( j );
let k = $( 2 );
if ($) {

}
else {
  k = $( 3 );
  $( k );
}
$( k );
let l = $( 2 );
if ($) {

}
else {
  l = $( 3 );
  $( l );
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( l );
  l = $( 2 );
  if ($) {

  }
  else {
    l = $( 3 );
    $( l );
  }
}
$( l );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: 2
 - 9: 2
 - 10: 2
 - 11: 2
 - 12: 2
 - 13: 2
 - 14: 2
 - 15: 2
 - 16: 2
 - 17: 2
 - 18: 2
 - 19: 2
 - 20: 2
 - 21: 2
 - 22: 2
 - 23: 2
 - 24: 2
 - 25: 2
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
