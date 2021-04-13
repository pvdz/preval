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
  debugger;
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
  debugger;
  const tmpIfTest = 0;
  const tmpBranchingA = function () {
    debugger;
    $('a');
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpIfTest$3 = 1;
    const tmpBranchingA$1 = function () {
      debugger;
      $('b');
      const tmpReturnArg$1 = tmpBranchingC$1();
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpIfTest$7 = 2;
      const tmpBranchingA$3 = function () {
        debugger;
        $('c');
        const tmpReturnArg$3 = tmpBranchingC$3();
        return tmpReturnArg$3;
      };
      const tmpBranchingB$3 = function () {
        debugger;
        const tmpReturnArg$5 = tmpBranchingC$3();
        return tmpReturnArg$5;
      };
      const tmpBranchingC$3 = function () {
        debugger;
        const tmpReturnArg$7 = tmpBranchingC$1();
        return tmpReturnArg$7;
      };
      if (tmpIfTest$7) {
        const tmpReturnArg$9 = tmpBranchingA$3();
        return tmpReturnArg$9;
      } else {
        const tmpReturnArg$11 = tmpBranchingB$3();
        return tmpReturnArg$11;
      }
    };
    const tmpBranchingC$1 = function () {
      debugger;
      $('after inner');
      const tmpReturnArg$13 = tmpBranchingC();
      return tmpReturnArg$13;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$15 = tmpBranchingA$1();
      return tmpReturnArg$15;
    } else {
      const tmpReturnArg$17 = tmpBranchingB$1();
      return tmpReturnArg$17;
    }
  };
  const tmpBranchingC = function () {
    debugger;
    $('after outer');
    return undefined;
  };
  if (tmpIfTest) {
    const tmpReturnArg$19 = tmpBranchingA();
    return tmpReturnArg$19;
  } else {
    const tmpReturnArg$21 = tmpBranchingB();
    return tmpReturnArg$21;
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
