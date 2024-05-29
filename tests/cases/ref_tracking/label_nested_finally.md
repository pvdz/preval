# Preval test case

# label_nested_finally.md

> Ref tracking > Label nested finally

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  $(x);
  x = 2;
  A: {
    try {
      $(x);
      x = 3;
    } catch {
      $(x);
      x = 4;
    } finally {
      break A;
    }
  }
  x = 6;
} catch {
  $(x);
  x = 5;
}
$(x);
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
try /*7*/ {
  $(x___11__);
  x___15__ = 2;
  A___17__: /*18*/ {
    try /*20*/ {
      try /*22*/ {
        $(x___26__);
        x___30__ = 3;
      } catch (e___32__) /*33*/ {
        $(x___37__);
        x___41__ = 4;
      }
    } finally /*42*/ {
      break A___44__;
    }
  }
  x___48__ = 6;
} catch (e$1___50__) /*51*/ {
  $(x___55__);
  x___59__ = 5;
}
$(x___63__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 11,55       | none           | 15,59
  - r @11      | 4
  - w @15      | ########## | 26,37,55    | 4              | 30,41,59
  - r @26      | 15
  - w @30      | ########## | 37,55       | 15             | 41,48,59
  - r @37      | 15,30
  - w @41      | ########## | 55          | 15,30          | 48,59
  - w @48      | ########## | 55,63       | 30,41          | 59
  - r @55      | 4,15,30,41,48
  - w @59      | ########## | 63          | 4,15,30,41,48  | none
  - r @63      | 48,59
