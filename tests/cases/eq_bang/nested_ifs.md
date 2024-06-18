# Preval test case

# nested_ifs.md

> Eq bang > Nested ifs
>
> Trying to come up with an example where one change will impact another

## Input

`````js filename=intro
const a = $(1) === $(2);
if (!a) {
  $('then a1');
  const b = $(1) === $(2);
  if (!b) {
    $('then b1');
  } else {
    $('else b1');
  }

} else {
  $('else a1');
  const c = $(1) === $(2);
  if (!c) {
    $('then c1');
  } else {
    $('else c1');
  }
}
if (!a) {
  $('then a2');
} else {
  $('else a2');
}
`````

## Pre Normal


`````js filename=intro
const a = $(1) === $(2);
if (!a) {
  $(`then a1`);
  const b = $(1) === $(2);
  if (!b) {
    $(`then b1`);
  } else {
    $(`else b1`);
  }
} else {
  $(`else a1`);
  const c = $(1) === $(2);
  if (!c) {
    $(`then c1`);
  } else {
    $(`else c1`);
  }
}
if (!a) {
  $(`then a2`);
} else {
  $(`else a2`);
}
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const a = tmpBinBothLhs === tmpBinBothRhs;
if (a) {
  $(`else a1`);
  const tmpBinBothLhs$1 = $(1);
  const tmpBinBothRhs$1 = $(2);
  const c = tmpBinBothLhs$1 === tmpBinBothRhs$1;
  if (c) {
    $(`else c1`);
  } else {
    $(`then c1`);
  }
} else {
  $(`then a1`);
  const tmpBinBothLhs$3 = $(1);
  const tmpBinBothRhs$3 = $(2);
  const b = tmpBinBothLhs$3 === tmpBinBothRhs$3;
  if (b) {
    $(`else b1`);
  } else {
    $(`then b1`);
  }
}
if (a) {
  $(`else a2`);
} else {
  $(`then a2`);
}
`````

## Output


`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const a = tmpBinBothLhs === tmpBinBothRhs;
if (a) {
  $(`else a1`);
  const tmpBinBothLhs$1 = $(1);
  const tmpBinBothRhs$1 = $(2);
  const c = tmpBinBothLhs$1 === tmpBinBothRhs$1;
  if (c) {
    $(`else c1`);
  } else {
    $(`then c1`);
  }
  $(`else a2`);
} else {
  $(`then a1`);
  const tmpBinBothLhs$3 = $(1);
  const tmpBinBothRhs$3 = $(2);
  const b = tmpBinBothLhs$3 === tmpBinBothRhs$3;
  if (b) {
    $(`else b1`);
  } else {
    $(`then b1`);
  }
  $(`then a2`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a === b;
if (c) {
  $( "else a1" );
  const d = $( 1 );
  const e = $( 2 );
  const f = d === e;
  if (f) {
    $( "else c1" );
  }
  else {
    $( "then c1" );
  }
  $( "else a2" );
}
else {
  $( "then a1" );
  const g = $( 1 );
  const h = $( 2 );
  const i = g === h;
  if (i) {
    $( "else b1" );
  }
  else {
    $( "then b1" );
  }
  $( "then a2" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'then a1'
 - 4: 1
 - 5: 2
 - 6: 'then b1'
 - 7: 'then a2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
