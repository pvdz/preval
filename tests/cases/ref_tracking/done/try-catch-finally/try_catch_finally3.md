# Preval test case

# try_catch_finally3.md

> Ref tracking > Done > Try-catch-finally > Try catch finally3

## Options

- refTest

## Input

`````js filename=intro
let a = 1;
try {
  $(a); // can observe 1
  a = 2;

  try {
    $(a); // can observe 2
    a = 3;
  } catch (e) {
    $(a); // can observe 2 3
    a = 4;
  } finally {
    $(a); // can observe 2 3 4 
    if ($()) {
      a = 5;
    }
  }
} catch (e) {
  $(a); // can observe 1 2 3 4 5
  a = 6;
} finally {
  $(a); // can observe 1 2 3 4 5 6 
  if ($()) {
    a = 7;
  }
}
$(a); // can observe  1 2 3 4 5 6 7
`````

## Output

(Annotated with pids)

`````filename=intro
let a___4__ = 1;
try /*7*/ {
  $(a___11__);
  a___15__ = 2;
  try /*17*/ {
    $(a___21__);
    a___25__ = 3;
  } catch (e___27__) /*28*/ {
    $(a___32__);
    a___36__ = 4;
  } finally /*37*/ {
    $(a___41__);
    const tmpIfTest___44__ = $();
    if (tmpIfTest___48__) {
      /*49*/ a___53__ = 5;
    } /*54*/ else {
    }
  }
} catch (e$1___56__) /*57*/ {
  $(a___61__);
  a___65__ = 6;
} finally /*66*/ {
  $(a___70__);
  const tmpIfTest$1___73__ = $();
  if (tmpIfTest$1___77__) {
    /*78*/ a___82__ = 7;
  } /*83*/ else {
  }
}
$(a___87__);
`````

Ref tracking result:

                | reads      | read by     | overWrites     | overwritten by
a:
  - w @4       | ########## | 11,61,70,87 | none           | 15,65,82
  - r @11      | 4
  - w @15      | ########## | 21,32,41,61,70,87 | 4              | 25,36,53,65,82
  - r @21      | 15
  - w @25      | ########## | 32,41,61,70,87 | 15             | 36,53,65,82
  - r @32      | 15,25
  - w @36      | ########## | 41,61,70,87 | 15,25          | 53,65,82
  - r @41      | 15,25,36
  - w @53      | ########## | 61,70,87    | 15,25,36       | 65,82
  - r @61      | 4,15,25,36,53
  - w @65      | ########## | 70,87       | 4,15,25,36,53  | 82
  - r @70      | 4,15,25,36,53,65
  - w @82      | ########## | 87          | 4,15,25,36,53,65 | none
  - r @87      | 4,15,25,36,53,65,82

tmpIfTest:
  - w @44      | ########## | 48          | none           | none
  - r @48      | 44

tmpIfTest$1:
  - w @73       | ########## | 77          | none           | none
  - r @77       | 73
