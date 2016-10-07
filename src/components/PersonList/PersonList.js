import React from "react";
import styles from "./PersonList.scss";
import { Person, AvatarPosition, AvatarSize } from "components/Person";
import { Button } from "react-toolbox/lib/button";

export const PersonList = (props) => {

  const displayRemoveButton = props.hasDeleteButton ? "none" : "inline";

  const persons = props.names.map((name) => (
    <div className={styles.person} key={name}>
      <Person avatarPosition={AvatarPosition.LEFT} avatarSize={AvatarSize.BIG} name={name} />
      <Button style={{display: displayRemoveButton}}
              className={styles.RemoveButton}
              icon='clear'
              onClick={() => props.onPersonRemove(name)}
              floating
      />
    </div>
  ));

  return (
    <div>{persons}</div>
  );
};

PersonList.propTypes = {
  names: React.PropTypes.array.isRequired,
  onPersonRemove: React.PropTypes.func,
  hasDeleteButton: React.PropTypes.bool
};

PersonList.defaultProps = {
  names: [],
  onPersonRemove: () => { },
  hasDeleteButton: false,
};

export default PersonList
