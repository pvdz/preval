# Preval test case

# early_return4.md

> Normalize > Switch > Early return4
>
> Sorting out the branching stuff

(This is the intermediate step without if-else branch reduction + regression shortening)

#TODO

## Input

`````js filename=intro
let f = function () {
  const tmpIfTest = 0;
  if (tmpIfTest) {
    $('a')
  } else {
    const tmpIfTest$1 = 1;
    if (tmpIfTest$1) {
      $('b')
    } else {
      const tmpIfTest$2 = 2;
      if (tmpIfTest$2) {
        $('c')
      }
    }
    $('after inner');
  }
  $('after outer');
};
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  const tmpIfTest = 0;
  if (tmpIfTest) {
    $('a');
  } else {
    const tmpIfTest$1 = 1;
    if (tmpIfTest$1) {
      $('b');
    } else {
      const tmpIfTest$2 = 2;
      if (tmpIfTest$2) {
        $('c');
      }
    }
    $('after inner');
  }
  $('after outer');
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpIfTest = 0;
  const tmpBranchingA = function (tmpIfTest$3) {
    $('a');
    const tmpReturnArg = tmpBranchingC(tmpIfTest$3);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpIfTest$4) {
    const tmpIfTest$5 = 1;
    const tmpBranchingA$1 = function (tmpIfTest$8, tmpIfTest$9) {
      $('b');
      const tmpReturnArg$1 = tmpBranchingC$1(tmpIfTest$8, tmpIfTest$9);
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function (tmpIfTest$10, tmpIfTest$11) {
      const tmpIfTest$12 = 2;
      const tmpBranchingA$2 = function (tmpIfTest$15, tmpIfTest$16, tmpIfTest$17) {
        $('c');
        const tmpReturnArg$2 = tmpBranchingC$2(tmpIfTest$15, tmpIfTest$16, tmpIfTest$17);
        return tmpReturnArg$2;
      };
      const tmpBranchingB$2 = function (tmpIfTest$18, tmpIfTest$19, tmpIfTest$20) {
        const tmpReturnArg$3 = tmpBranchingC$2(tmpIfTest$18, tmpIfTest$19, tmpIfTest$20);
        return tmpReturnArg$3;
      };
      const tmpBranchingC$2 = function (tmpIfTest$21, tmpIfTest$22, tmpIfTest$23) {
        const tmpReturnArg$4 = tmpBranchingC$1(tmpIfTest$21, tmpIfTest$22);
        return tmpReturnArg$4;
      };
      if (tmpIfTest$12) {
        const tmpReturnArg$5 = tmpBranchingA$2(tmpIfTest$10, tmpIfTest$11, tmpIfTest$12);
        return tmpReturnArg$5;
      } else {
        const tmpReturnArg$6 = tmpBranchingB$2(tmpIfTest$10, tmpIfTest$11, tmpIfTest$12);
        return tmpReturnArg$6;
      }
    };
    const tmpBranchingC$1 = function (tmpIfTest$13, tmpIfTest$14) {
      $('after inner');
      const tmpReturnArg$7 = tmpBranchingC(tmpIfTest$13);
      return tmpReturnArg$7;
    };
    if (tmpIfTest$5) {
      const tmpReturnArg$8 = tmpBranchingA$1(tmpIfTest$4, tmpIfTest$5);
      return tmpReturnArg$8;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(tmpIfTest$4, tmpIfTest$5);
      return tmpReturnArg$9;
    }
  };
  const tmpBranchingC = function (tmpIfTest$7) {
    $('after outer');
  };
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingA(tmpIfTest);
    return tmpReturnArg$10;
  } else {
    const tmpReturnArg$11 = tmpBranchingB(tmpIfTest);
    return tmpReturnArg$11;
  }
};
f();
`````

## Output

`````js filename=intro
$('b');
$('after inner');
$('after outer');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'b'
 - 2: 'after inner'
 - 3: 'after outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
