# Preval test case

# first_test_write_not_var.md

> Unwind loops > Separate test > First test write not var
>
> Unrolling loops

#TODO

## Input

`````js filename=intro
while (test) {
  $('yolo');
  counter = counter + 1;
  test = counter < 10;
}
while (test) {
  $('yolo');
  counter = counter + 1;
  test = counter < 10;
}
let counter = 0;
let test = counter < 10;
`````

## Pre Normal

`````js filename=intro
while ($throwTDZError(`TDZ triggered for this read: while (test) {`)) {
  $(`yolo`);
  $throwTDZError(`TDZ triggered for this read: counter + 1`) + 1,
    $throwTDZError(`TDZ triggered for this assignment: counter = \$throwTDZError(\`TDZ triggered for this read: counter + 1\`) + 1`);
  $throwTDZError(`TDZ triggered for this read: counter < 10`) < 10,
    $throwTDZError(`TDZ triggered for this assignment: test = \$throwTDZError(\`TDZ triggered for this read: counter < 10\`) < 10`);
}
while ($throwTDZError(`TDZ triggered for this read: while (test) {`)) {
  $(`yolo`);
  $throwTDZError(`TDZ triggered for this read: counter + 1`) + 1,
    $throwTDZError(`TDZ triggered for this assignment: counter = \$throwTDZError(\`TDZ triggered for this read: counter + 1\`) + 1`);
  $throwTDZError(`TDZ triggered for this read: counter < 10`) < 10,
    $throwTDZError(`TDZ triggered for this assignment: test = \$throwTDZError(\`TDZ triggered for this read: counter < 10\`) < 10`);
}
let counter = 0;
let test = counter < 10;
`````

## Normalized

`````js filename=intro
let tmpIfTest = $throwTDZError(`TDZ triggered for this read: while (test) {`);
while (true) {
  if (tmpIfTest) {
    $(`yolo`);
    const tmpBinLhs = $throwTDZError(`TDZ triggered for this read: counter + 1`);
    tmpBinLhs + 0;
    $throwTDZError(`TDZ triggered for this assignment: counter = \$throwTDZError(\`TDZ triggered for this read: counter + 1\`) + 1`);
    const tmpBinLhs$1 = $throwTDZError(`TDZ triggered for this read: counter < 10`);
    tmpBinLhs$1 < 0;
    $throwTDZError(`TDZ triggered for this assignment: test = \$throwTDZError(\`TDZ triggered for this read: counter < 10\`) < 10`);
    tmpIfTest = $throwTDZError(`TDZ triggered for this read: while (test) {`);
  } else {
    break;
  }
}
let tmpIfTest$1 = $throwTDZError(`TDZ triggered for this read: while (test) {`);
while (true) {
  if (tmpIfTest$1) {
    $(`yolo`);
    const tmpBinLhs$3 = $throwTDZError(`TDZ triggered for this read: counter + 1`);
    tmpBinLhs$3 + 0;
    $throwTDZError(`TDZ triggered for this assignment: counter = \$throwTDZError(\`TDZ triggered for this read: counter + 1\`) + 1`);
    const tmpBinLhs$5 = $throwTDZError(`TDZ triggered for this read: counter < 10`);
    tmpBinLhs$5 < 0;
    $throwTDZError(`TDZ triggered for this assignment: test = \$throwTDZError(\`TDZ triggered for this read: counter < 10\`) < 10`);
    tmpIfTest$1 = $throwTDZError(`TDZ triggered for this read: while (test) {`);
  } else {
    break;
  }
}
let counter = 0;
let test = counter < 10;
`````

## Output

`````js filename=intro
let tmpIfTest = $throwTDZError(`TDZ triggered for this read: while (test) {`);
if (tmpIfTest) {
  $(`yolo`);
  const tmpBinLhs = $throwTDZError(`TDZ triggered for this read: counter + 1`);
  tmpBinLhs + 0;
  $throwTDZError(`TDZ triggered for this assignment: counter = \$throwTDZError(\`TDZ triggered for this read: counter + 1\`) + 1`);
  const tmpBinLhs$1 = $throwTDZError(`TDZ triggered for this read: counter < 10`);
  tmpBinLhs$1 ** 0;
  $throwTDZError(`TDZ triggered for this assignment: test = \$throwTDZError(\`TDZ triggered for this read: counter < 10\`) < 10`);
  tmpIfTest = $throwTDZError(`TDZ triggered for this read: while (test) {`);
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      $(`yolo`);
      const tmpBinLhs$2 = $throwTDZError(`TDZ triggered for this read: counter + 1`);
      tmpBinLhs$2 + 0;
      $throwTDZError(`TDZ triggered for this assignment: counter = \$throwTDZError(\`TDZ triggered for this read: counter + 1\`) + 1`);
      const tmpBinLhs$4 = $throwTDZError(`TDZ triggered for this read: counter < 10`);
      tmpBinLhs$4 ** 0;
      $throwTDZError(`TDZ triggered for this assignment: test = \$throwTDZError(\`TDZ triggered for this read: counter < 10\`) < 10`);
      tmpIfTest = $throwTDZError(`TDZ triggered for this read: while (test) {`);
    } else {
      break;
    }
  }
} else {
}
let tmpIfTest$1 = $throwTDZError(`TDZ triggered for this read: while (test) {`);
if (tmpIfTest$1) {
  $(`yolo`);
  const tmpBinLhs$3 = $throwTDZError(`TDZ triggered for this read: counter + 1`);
  tmpBinLhs$3 + 0;
  $throwTDZError(`TDZ triggered for this assignment: counter = \$throwTDZError(\`TDZ triggered for this read: counter + 1\`) + 1`);
  const tmpBinLhs$5 = $throwTDZError(`TDZ triggered for this read: counter < 10`);
  tmpBinLhs$5 ** 0;
  $throwTDZError(`TDZ triggered for this assignment: test = \$throwTDZError(\`TDZ triggered for this read: counter < 10\`) < 10`);
  tmpIfTest$1 = $throwTDZError(`TDZ triggered for this read: while (test) {`);
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest$1) {
      $(`yolo`);
      const tmpBinLhs$6 = $throwTDZError(`TDZ triggered for this read: counter + 1`);
      tmpBinLhs$6 + 0;
      $throwTDZError(`TDZ triggered for this assignment: counter = \$throwTDZError(\`TDZ triggered for this read: counter + 1\`) + 1`);
      const tmpBinLhs$8 = $throwTDZError(`TDZ triggered for this read: counter < 10`);
      tmpBinLhs$8 ** 0;
      $throwTDZError(`TDZ triggered for this assignment: test = \$throwTDZError(\`TDZ triggered for this read: counter < 10\`) < 10`);
      tmpIfTest$1 = $throwTDZError(`TDZ triggered for this read: while (test) {`);
    } else {
      break;
    }
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = b( "TDZ triggered for this read: while (test) {" );
if (a) {
  $( "yolo" );
  const c = b( "TDZ triggered for this read: counter + 1" );
  c + 0;
  b( "TDZ triggered for this assignment: counter = $throwTDZError(`TDZ triggered for this read: counter + 1`) + 1" );
  const d = b( "TDZ triggered for this read: counter < 10" );
  d ** 0;
  b( "TDZ triggered for this assignment: test = $throwTDZError(`TDZ triggered for this read: counter < 10`) < 10" );
  a = b( "TDZ triggered for this read: while (test) {" );
  while ($LOOP_UNROLL_10) {
    if (a) {
      $( "yolo" );
      const e = b( "TDZ triggered for this read: counter + 1" );
      e + 0;
      b( "TDZ triggered for this assignment: counter = $throwTDZError(`TDZ triggered for this read: counter + 1`) + 1" );
      const f = b( "TDZ triggered for this read: counter < 10" );
      f ** 0;
      b( "TDZ triggered for this assignment: test = $throwTDZError(`TDZ triggered for this read: counter < 10`) < 10" );
      a = b( "TDZ triggered for this read: while (test) {" );
    }
    else {
      break;
    }
  }
}
let g = b( "TDZ triggered for this read: while (test) {" );
if (g) {
  $( "yolo" );
  const h = b( "TDZ triggered for this read: counter + 1" );
  h + 0;
  b( "TDZ triggered for this assignment: counter = $throwTDZError(`TDZ triggered for this read: counter + 1`) + 1" );
  const i = b( "TDZ triggered for this read: counter < 10" );
  i ** 0;
  b( "TDZ triggered for this assignment: test = $throwTDZError(`TDZ triggered for this read: counter < 10`) < 10" );
  g = b( "TDZ triggered for this read: while (test) {" );
  while ($LOOP_UNROLL_10) {
    if (g) {
      $( "yolo" );
      const j = b( "TDZ triggered for this read: counter + 1" );
      j + 0;
      b( "TDZ triggered for this assignment: counter = $throwTDZError(`TDZ triggered for this read: counter + 1`) + 1" );
      const k = b( "TDZ triggered for this read: counter < 10" );
      k ** 0;
      b( "TDZ triggered for this assignment: test = $throwTDZError(`TDZ triggered for this read: counter < 10`) < 10" );
      g = b( "TDZ triggered for this read: while (test) {" );
    }
    else {
      break;
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
