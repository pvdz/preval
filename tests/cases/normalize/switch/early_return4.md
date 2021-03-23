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
  const tmpBranchingA = function ($$0) {
    let tmpIfTest$3 = $$0;
    debugger;
    $('a');
    const tmpReturnArg = tmpBranchingC(tmpIfTest$3);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0) {
    let tmpIfTest$4 = $$0;
    debugger;
    const tmpIfTest$5 = 1;
    const tmpBranchingA$1 = function ($$0, $$1) {
      let tmpIfTest$8 = $$0;
      let tmpIfTest$9 = $$1;
      debugger;
      $('b');
      const tmpReturnArg$1 = tmpBranchingC$1(tmpIfTest$8, tmpIfTest$9);
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function ($$0, $$1) {
      let tmpIfTest$10 = $$0;
      let tmpIfTest$11 = $$1;
      debugger;
      const tmpIfTest$12 = 2;
      const tmpBranchingA$2 = function ($$0, $$1, $$2) {
        let tmpIfTest$15 = $$0;
        let tmpIfTest$16 = $$1;
        let tmpIfTest$17 = $$2;
        debugger;
        $('c');
        const tmpReturnArg$2 = tmpBranchingC$2(tmpIfTest$15, tmpIfTest$16, tmpIfTest$17);
        return tmpReturnArg$2;
      };
      const tmpBranchingB$2 = function ($$0, $$1, $$2) {
        let tmpIfTest$18 = $$0;
        let tmpIfTest$19 = $$1;
        let tmpIfTest$20 = $$2;
        debugger;
        const tmpReturnArg$3 = tmpBranchingC$2(tmpIfTest$18, tmpIfTest$19, tmpIfTest$20);
        return tmpReturnArg$3;
      };
      const tmpBranchingC$2 = function ($$0, $$1, $$2) {
        let tmpIfTest$21 = $$0;
        let tmpIfTest$22 = $$1;
        let tmpIfTest$23 = $$2;
        debugger;
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
    const tmpBranchingC$1 = function ($$0, $$1) {
      let tmpIfTest$13 = $$0;
      let tmpIfTest$14 = $$1;
      debugger;
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
  const tmpBranchingC = function ($$0) {
    let tmpIfTest$7 = $$0;
    debugger;
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
